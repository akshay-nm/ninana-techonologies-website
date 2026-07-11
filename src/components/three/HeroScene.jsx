'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import SceneCanvas, { usePrefersReducedMotion } from './SceneCanvas'

const GAP = 1.0
const ASSEMBLE_DURATION = 1.4

const PALETTES = {
  dark: {
    fog: '#05080f',
    box: '#31426e',
    boxRoughness: 0.85,
    litColor: '#0b1120',
    litEmissive: '#22d3ee',
    litIntensity: 1.3,
    litPulse: 0.35,
    blueprint: '#22d3ee',
    blueprintOpacity: [0.35, 0.28],
    grid: ['#2e4d7d', '#182542'],
    ambient: { intensity: 0.65, color: '#8fb3ff' },
    directional: { intensity: 1.2, color: '#cfe0ff' },
    fill: { intensity: 0.7, color: '#4a6db5' },
    point: { intensity: 0.8, color: '#22d3ee' },
  },
  light: {
    fog: '#f8fafc',
    box: '#cbd5e1',
    boxRoughness: 0.95,
    litColor: '#bae6fd',
    litEmissive: '#06b6d4',
    litIntensity: 0.55,
    litPulse: 0.15,
    blueprint: '#0891b2',
    blueprintOpacity: [0.4, 0.3],
    grid: ['#94a3b8', '#dbe3ec'],
    ambient: { intensity: 0.95, color: '#ffffff' },
    directional: { intensity: 1.7, color: '#ffffff' },
    fill: { intensity: 0.4, color: '#dbeafe' },
    point: { intensity: 0.35, color: '#06b6d4' },
  },
}

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

function CityBlock({ reduced, palette }) {
  const groupRef = useRef()
  const darkRef = useRef()
  const litRef = useRef()
  const pointerRef = useRef({ x: 0, y: 0 })
  const doneRef = useRef(false)
  const dummy = useMemo(() => new THREE.Object3D(), [])

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
      }
      if (Math.random() < 0.14) lit.push(item)
      else dark.push(item)
    }
    return { dark, lit }
  }, [])

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

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    const smoothed = pointerRef.current
    smoothed.x += (pointer.x - smoothed.x) * 0.04
    smoothed.y += (pointer.y - smoothed.y) * 0.04

    if (groupRef.current) {
      const spin = reduced ? -0.35 : t * 0.05
      groupRef.current.rotation.y = spin + smoothed.x * 0.22
      groupRef.current.rotation.x = smoothed.y * -0.04
    }

    const assembleDone = reduced || t > 5.5
    if (!doneRef.current || !assembleDone) {
      applyInstances(darkRef.current, dark, t)
      applyInstances(litRef.current, lit, t)
      if (assembleDone) doneRef.current = true
    }

    if (litRef.current) {
      litRef.current.material.emissiveIntensity =
        palette.litIntensity + Math.sin(t * 1.4) * palette.litPulse
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
        <meshStandardMaterial
          color={palette.litColor}
          emissive={palette.litEmissive}
          emissiveIntensity={palette.litIntensity}
          roughness={0.4}
        />
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

  return (
    <SceneCanvas
      className={className}
      camera={{ position: [18, 10.5, 18], fov: 32 }}
      onCreated={({ camera }) => camera.lookAt(-2.6, 3.2, 0)}
    >
      <fog attach="fog" args={[palette.fog, 24, 52]} />
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
      <CityBlock reduced={reduced} palette={palette} />
    </SceneCanvas>
  )
}
