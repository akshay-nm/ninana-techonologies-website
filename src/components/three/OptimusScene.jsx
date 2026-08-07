'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import SceneCanvas, { usePrefersReducedMotion } from './SceneCanvas'
import { useScenePalette } from './HeroScene'

/**
 * Optimus in one image: marks come off a paper and land somewhere, and the
 * point of the product is showing you where. Loose marks fall and settle into
 * four columns, one of which fills faster and glows — the thing you would fix
 * first.
 *
 * Deliberately unlike its siblings: Vivid and Pragati are box grids and Wasp
 * is a honeycomb, all of them static arrangements. This one is the only scene
 * on the page where something is being sorted.
 */

const PALETTES = {
  dark: {
    mark: '#2b3d55',
    markEmissive: '#14b8a6',
    markIdleIntensity: 0.25,
    column: '#1c2b3f',
    columnEmissive: '#0f766e',
    columnIntensity: 0.35,
    worst: '#07211f',
    worstEmissive: '#2dd4bf',
    worstIntensity: 1.15,
    floor: '#16233a',
    ambient: { intensity: 0.6, color: '#d7fbf4' },
    directional: { intensity: 1.0, color: '#eafffb' },
    point: { intensity: 0.9, color: '#2dd4bf' },
  },
  light: {
    mark: '#cbd5e1',
    markEmissive: '#000000',
    markIdleIntensity: 0,
    column: '#e2e8f0',
    columnEmissive: '#000000',
    columnIntensity: 0,
    worst: '#99f6e4',
    worstEmissive: '#0d9488',
    worstIntensity: 0.7,
    floor: '#e8eef5',
    ambient: { intensity: 1.05, color: '#ffffff' },
    directional: { intensity: 1.5, color: '#ffffff' },
    point: { intensity: 0.28, color: '#0d9488' },
  },
}

/** Four causes, the same four the report uses. The first bleeds the most. */
const COLUMNS = [
  { x: -2.55, height: 4, worst: true },
  { x: -0.85, height: 2 },
  { x: 0.85, height: 3 },
  { x: 2.55, height: 1 },
]

const CYCLE = 7.2
const clamp01 = (p) => Math.min(Math.max(p, 0), 1)
const easeOutCubic = (p) => 1 - Math.pow(1 - clamp01(p), 3)

/**
 * One falling mark per stacked slot. Each is given its own delay so they
 * arrive in a stream rather than a curtain, and a small x drift so the fall
 * reads as sorting rather than as a straight drop.
 */
function buildMarks() {
  const marks = []
  COLUMNS.forEach((column, columnIndex) => {
    for (let level = 0; level < column.height; level++) {
      marks.push({
        columnIndex,
        level,
        targetX: column.x,
        startX: column.x + (columnIndex - 1.5) * 0.75,
        worst: Boolean(column.worst),
        delay: 0.35 + level * 0.36 + columnIndex * 0.22,
      })
    }
  })
  return marks
}

const FLOOR_Y = -1.75
const SLOT = 0.46

function Marks({ reduced, palette }) {
  const groupRef = useRef()
  const refs = useRef([])
  const pointerRef = useRef({ x: 0, y: 0 })
  const marks = useMemo(buildMarks, [])

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    const smoothed = pointerRef.current
    smoothed.x += (pointer.x - smoothed.x) * 0.05
    smoothed.y += (pointer.y - smoothed.y) * 0.05

    if (groupRef.current) {
      const sway = reduced ? 0 : Math.sin(t * 0.22) * 0.05
      groupRef.current.rotation.y = smoothed.x * 0.28 + sway
      groupRef.current.rotation.x = smoothed.y * -0.16
    }

    // The whole sort replays on a loop, so a card that scrolls into view part
    // way through still shows the marks landing rather than an already-made pile.
    const cycle = t % CYCLE

    refs.current.forEach((mesh, index) => {
      if (!mesh) return
      const mark = marks[index]
      const settled = mark.level * SLOT + FLOOR_Y + SLOT / 2
      const p = reduced ? 1 : easeOutCubic((cycle - mark.delay) / 1.15)

      mesh.visible = p > 0.001
      mesh.position.y = settled + (1 - p) * 5.2
      mesh.position.x = mark.startX + (mark.targetX - mark.startX) * p
      mesh.rotation.z = reduced ? 0 : (1 - p) * 1.4
      mesh.scale.setScalar(0.55 + p * 0.45)

      if (mark.worst) {
        const pulse = reduced ? 1 : 1 + Math.sin(t * 1.7 + mark.level * 0.9) * 0.32
        mesh.material.emissiveIntensity = palette.worstIntensity * pulse * p
      } else {
        mesh.material.emissiveIntensity = palette.markIdleIntensity * p
      }
    })
  })

  return (
    <group ref={groupRef}>
      {/* the columns the marks are being sorted into, drawn as empty wells */}
      {COLUMNS.map((column, index) => (
        <mesh key={`well-${index}`} position={[column.x, FLOOR_Y - 0.14, 0]}>
          <boxGeometry args={[1.16, 0.16, 1.16]} />
          <meshStandardMaterial
            color={column.worst ? palette.worst : palette.column}
            emissive={column.worst ? palette.worstEmissive : palette.columnEmissive}
            emissiveIntensity={column.worst ? palette.worstIntensity * 0.5 : palette.columnIntensity}
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
      ))}

      {marks.map((mark, index) => (
        <mesh key={index} ref={(el) => (refs.current[index] = el)}>
          <boxGeometry args={[0.92, 0.34, 0.92]} />
          <meshStandardMaterial
            color={mark.worst ? palette.worst : palette.mark}
            emissive={mark.worst ? palette.worstEmissive : palette.markEmissive}
            emissiveIntensity={mark.worst ? palette.worstIntensity : palette.markIdleIntensity}
            roughness={0.5}
            metalness={0.25}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function OptimusScene({ className }) {
  const reduced = usePrefersReducedMotion()
  const palette = useScenePalette(PALETTES)

  return (
    <SceneCanvas className={className} camera={{ position: [0, 1.1, 9.2], fov: 34 }}>
      <ambientLight intensity={palette.ambient.intensity} color={palette.ambient.color} />
      <directionalLight
        position={[4, 7, 8]}
        intensity={palette.directional.intensity}
        color={palette.directional.color}
      />
      <pointLight
        position={[-2.6, 0.4, 3.4]}
        intensity={palette.point.intensity}
        color={palette.point.color}
        distance={13}
      />
      <Marks reduced={reduced} palette={palette} />
    </SceneCanvas>
  )
}
