'use client'

import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import SceneCanvas, { usePrefersReducedMotion } from './SceneCanvas'

const GAP = 1.0
const ASSEMBLE_DURATION = 1.4

const PALETTES = {
  dark: {
    fog: '#05080f',
    box: '#31426e',
    boxRoughness: 0.85,
    winDim: '#16324a',
    winBright: '#7dd3fc',
    blueprint: '#22d3ee',
    blueprintOpacity: [0.35, 0.28],
    grid: ['#2e4d7d', '#182542'],
    shadow: 0.55,
    ambient: { intensity: 0.65, color: '#8fb3ff' },
    directional: { intensity: 1.2, color: '#cfe0ff' },
    fill: { intensity: 0.7, color: '#4a6db5' },
    point: { intensity: 0.8, color: '#22d3ee' },
  },
  light: {
    fog: '#f8fafc',
    box: '#cbd5e1',
    boxRoughness: 0.95,
    winDim: '#bfdbfe',
    winBright: '#0ea5e9',
    blueprint: '#0891b2',
    blueprintOpacity: [0.4, 0.3],
    grid: ['#94a3b8', '#dbe3ec'],
    shadow: 0.28,
    ambient: { intensity: 0.95, color: '#ffffff' },
    directional: { intensity: 1.7, color: '#ffffff' },
    fill: { intensity: 0.4, color: '#dbeafe' },
    point: { intensity: 0.35, color: '#06b6d4' },
  },
}

const ANNOTATIONS = [
  { anchor: [-2.05, 8.3, 0], label: 'TOWER A · 09 FL' },
  { anchor: [3.6, 5.35, 0], label: 'TOWER B · 05 FL' },
]

function buildCells() {
  const cells = []
  // Main tower: 4x4 footprint, 9 floors, corners tapered off near the top
  for (let x = 0; x < 4; x++) {
    for (let z = 0; z < 4; z++) {
      for (let y = 0; y < 9; y++) {
        const corner = (x === 0 || x === 3) && (z === 0 || z === 3)
        if (y > 6 && corner) continue
        cells.push([(x - 1.5) * GAP, (y + 0.5) * GAP, (z - 1.5) * GAP])
      }
    }
  }
  // Secondary tower beside it
  for (let x = 0; x < 3; x++) {
    for (let z = 0; z < 3; z++) {
      for (let y = 0; y < 5; y++) {
        cells.push([(x + 2.6) * GAP, (y + 0.5) * GAP, (z - 1.0) * GAP])
      }
    }
  }
  return cells
}

const easeOutCubic = (p) => 1 - Math.pow(1 - Math.min(Math.max(p, 0), 1), 3)

// Soft radial contact shadow that grounds the towers on the grid.
function ContactShadow({ opacity }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 256
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    gradient.addColorStop(0, 'rgba(0,0,0,1)')
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 256)
    return new THREE.CanvasTexture(canvas)
  }, [])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.4, 0.02, 0]}>
      <planeGeometry args={[15, 10]} />
      <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  )
}

// Projects the annotation anchors (group-local) to screen space every frame
// and moves the DOM labels to match.
function AnnotationTracker({ groupRef, labelRefs }) {
  const { camera, size } = useThree()
  const vec = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    if (!groupRef.current) return
    ANNOTATIONS.forEach((annotation, index) => {
      const el = labelRefs.current[index]
      if (!el) return
      vec.set(...annotation.anchor)
      groupRef.current.localToWorld(vec)
      vec.project(camera)
      const x = (vec.x * 0.5 + 0.5) * size.width
      const y = (-vec.y * 0.5 + 0.5) * size.height
      el.style.transform = `translate(${x}px, ${y}px)`
    })
  })

  return null
}

function CityBlock({ reduced, palette, groupRef }) {
  const darkRef = useRef()
  const litRef = useRef()
  const doneRef = useRef(false)
  const dragRef = useRef({ active: false, lastX: 0, velocity: 0, offset: 0 })
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const tmpColor = useMemo(() => new THREE.Color(), [])
  const dimColor = useMemo(() => new THREE.Color(palette.winDim), [palette])
  const brightColor = useMemo(() => new THREE.Color(palette.winBright), [palette])
  const { gl } = useThree()

  const { dark, lit } = useMemo(() => {
    const cells = buildCells()
    const dark = []
    const lit = []
    for (const cell of cells) {
      const item = {
        target: new THREE.Vector3(cell[0], cell[1], cell[2]),
        start: new THREE.Vector3(
          (Math.random() - 0.5) * 26,
          cell[1] + 9 + Math.random() * 12,
          (Math.random() - 0.5) * 26
        ),
        delay: cell[1] * 0.22 + Math.random() * 0.5,
        axis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize(),
        // window flicker state
        level: 1,
        flickTarget: 1,
        nextFlick: 4 + Math.random() * 8,
      }
      if (Math.random() < 0.14) lit.push(item)
      else dark.push(item)
    }
    return { dark, lit }
  }, [])

  // Drag to orbit, with inertia and a soft spring back to the framed angle.
  useEffect(() => {
    const el = gl.domElement
    const drag = dragRef.current
    el.style.touchAction = 'pan-y'
    el.style.cursor = 'grab'

    const onDown = (event) => {
      drag.active = true
      drag.lastX = event.clientX
      drag.velocity = 0
      el.setPointerCapture?.(event.pointerId)
      el.style.cursor = 'grabbing'
    }
    const onMove = (event) => {
      if (!drag.active) return
      const dx = event.clientX - drag.lastX
      drag.lastX = event.clientX
      drag.velocity = dx * 0.005
      drag.offset += dx * 0.005
    }
    const onUp = () => {
      drag.active = false
      el.style.cursor = 'grab'
    }

    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
    }
  }, [gl])

  const applyInstances = (mesh, items, time) => {
    if (!mesh) return
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const p = reduced ? 1 : easeOutCubic((time - item.delay) / ASSEMBLE_DURATION)
      dummy.position.lerpVectors(item.start, item.target, p)
      dummy.quaternion.setFromAxisAngle(item.axis, (1 - p) * 2.4)
      const s = 0.001 + p * 0.92
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  }

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime()
    const drag = dragRef.current

    if (groupRef.current) {
      if (!drag.active) {
        drag.velocity *= 0.94
        drag.offset += drag.velocity
        drag.offset *= 0.97
      }
      const spin = reduced ? -0.35 : t * 0.05
      groupRef.current.rotation.y = spin + drag.offset
    }

    const assembleDone = reduced || t > 5.5
    if (!doneRef.current || !assembleDone) {
      applyInstances(darkRef.current, dark, t)
      applyInstances(litRef.current, lit, t)
      if (assembleDone) doneRef.current = true
    }

    // Windows flick on and off like a building at dusk.
    if (litRef.current) {
      for (let i = 0; i < lit.length; i++) {
        const item = lit[i]
        if (!reduced && t > item.nextFlick) {
          item.flickTarget = item.flickTarget > 0.5 ? 0.12 : 1
          item.nextFlick = t + 2.5 + Math.random() * 9
        }
        item.level += (item.flickTarget - item.level) * Math.min(delta * 4, 1)
        tmpColor.copy(dimColor).lerp(brightColor, item.level)
        litRef.current.setColorAt(i, tmpColor)
      }
      litRef.current.instanceColor.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef} position={[-0.6, 0, 0]}>
      <instancedMesh ref={darkRef} args={[null, null, dark.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={palette.box}
          roughness={palette.boxRoughness}
          metalness={0.15}
        />
      </instancedMesh>
      <instancedMesh ref={litRef} args={[null, null, lit.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#ffffff" />
      </instancedMesh>

      {/* Blueprint outlines the towers assemble into */}
      <lineSegments position={[0, 4.5 * GAP, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(4 * GAP, 9 * GAP, 4 * GAP)]} />
        <lineBasicMaterial
          color={palette.blueprint}
          transparent
          opacity={palette.blueprintOpacity[0]}
        />
      </lineSegments>
      <lineSegments position={[3.6 * GAP, 2.5 * GAP, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(3 * GAP, 5 * GAP, 3 * GAP)]} />
        <lineBasicMaterial
          color={palette.blueprint}
          transparent
          opacity={palette.blueprintOpacity[1]}
        />
      </lineSegments>

      <ContactShadow opacity={palette.shadow} />
      <gridHelper args={[46, 46, palette.grid[0], palette.grid[1]]} position={[0, 0, 0]} />
    </group>
  )
}

export function useScenePalette(palettes) {
  const { resolvedTheme } = useTheme()
  return palettes[resolvedTheme === 'light' ? 'light' : 'dark']
}

export default function HeroScene({ className }) {
  const reduced = usePrefersReducedMotion()
  const palette = useScenePalette(PALETTES)
  const groupRef = useRef()
  const labelRefs = useRef([])

  return (
    <div className={className}>
      <SceneCanvas
        className="absolute inset-0"
        camera={{ position: [14.5, 8.5, 14.5], fov: 33 }}
        onCreated={({ camera }) => camera.lookAt(-1.8, 3.6, 0)}
      >
        <fog attach="fog" args={[palette.fog, 26, 56]} />
        <ambientLight intensity={palette.ambient.intensity} color={palette.ambient.color} />
        <directionalLight
          position={[9, 14, 6]}
          intensity={palette.directional.intensity}
          color={palette.directional.color}
        />
        <directionalLight
          position={[-9, 6, -8]}
          intensity={palette.fill.intensity}
          color={palette.fill.color}
        />
        <pointLight
          position={[-7, 4, -5]}
          intensity={palette.point.intensity}
          color={palette.point.color}
        />
        <CityBlock reduced={reduced} palette={palette} groupRef={groupRef} />
        <AnnotationTracker groupRef={groupRef} labelRefs={labelRefs} />
      </SceneCanvas>

      {/* Blueprint labels, projected from the 3D anchors */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block" aria-hidden="true">
        {ANNOTATIONS.map((annotation, index) => (
          <div
            key={annotation.label}
            ref={(el) => (labelRefs.current[index] = el)}
            className="absolute left-0 top-0"
            style={{ willChange: 'transform' }}
          >
            <div
              className="flex -translate-x-1/2 -translate-y-full animate-fade-in flex-col items-center opacity-0"
              style={{ animationDelay: reduced ? '0.5s' : '3.4s' }}
            >
              <span className="whitespace-nowrap rounded border border-cyan-600/30 bg-white/70 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-cyan-700 backdrop-blur-sm dark:border-cyan-400/30 dark:bg-ink/70 dark:text-cyan-300">
                {annotation.label}
              </span>
              <span className="h-7 w-px bg-cyan-600/40 dark:bg-cyan-400/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-600/80 dark:bg-cyan-400/80" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
