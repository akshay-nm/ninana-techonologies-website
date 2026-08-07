'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import SceneCanvas, { usePrefersReducedMotion } from './SceneCanvas'
import { useScenePalette } from './HeroScene'

/**
 * One idea: the areas an exam tests you on are not equally strong, and the
 * short one is the one worth your time.
 *
 * Columns rise to the heights a diagnosis found. The shortest holds a light
 * the others do not. That is the whole scene — no narrative, no particles,
 * matching the restraint of the three it sits beside.
 *
 * Round columns rather than cubes on purpose: the page already has two box
 * grids and a honeycomb, and a silhouette of uneven heights is the thing
 * carrying the meaning here.
 */

const PALETTES = {
  dark: {
    column: '#2a3b52',
    columnEmissive: '#0f766e',
    columnIdle: 0.16,
    weak: '#0b2e2b',
    weakEmissive: '#2dd4bf',
    weakLit: 1.15,
    cap: '#3a4d66',
    weakCap: '#5eead4',
    floor: '#1a2537',
    ambient: { intensity: 0.6, color: '#d9fbf6' },
    directional: { intensity: 1.05, color: '#f2fffd' },
    point: { intensity: 0.85, color: '#2dd4bf' },
  },
  light: {
    column: '#d3dce6',
    columnEmissive: '#000000',
    columnIdle: 0,
    weak: '#99f6e4',
    weakEmissive: '#0d9488',
    weakLit: 0.7,
    cap: '#c2ccd8',
    weakCap: '#0d9488',
    floor: '#e9eef4',
    ambient: { intensity: 1.05, color: '#ffffff' },
    directional: { intensity: 1.5, color: '#ffffff' },
    point: { intensity: 0.28, color: '#0d9488' },
  },
}

/**
 * Seven areas, unlabelled so they read as chapters, subjects or whatever the
 * viewer's own exam is divided into. Heights are uneven the way real ones are
 * — not a tidy ramp — with one obviously behind the rest.
 */
const HEIGHTS = [2.5, 3.1, 2.2, 2.85, 0.95, 2.65, 3.0]
const WEAK = HEIGHTS.indexOf(Math.min(...HEIGHTS))
const GAP = 0.86
const RADIUS = 0.3

const easeOutCubic = (p) => 1 - Math.pow(1 - Math.min(Math.max(p, 0), 1), 3)

function Columns({ reduced, palette }) {
  const groupRef = useRef()
  const refs = useRef([])
  const capRefs = useRef([])
  const pointerRef = useRef({ x: 0, y: 0 })

  const columns = useMemo(
    () =>
      HEIGHTS.map((height, index) => ({
        height,
        x: (index - (HEIGHTS.length - 1) / 2) * GAP,
        weak: index === WEAK,
        // Rising left to right, so the eye travels the row and lands on the gap.
        delay: 0.15 + index * 0.13,
      })),
    []
  )

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    const smoothed = pointerRef.current
    smoothed.x += (pointer.x - smoothed.x) * 0.05
    smoothed.y += (pointer.y - smoothed.y) * 0.05

    if (groupRef.current) {
      const sway = reduced ? 0 : Math.sin(t * 0.2) * 0.06
      groupRef.current.rotation.y = smoothed.x * 0.32 + sway
      groupRef.current.rotation.x = smoothed.y * -0.14
    }

    columns.forEach((column, index) => {
      const mesh = refs.current[index]
      const cap = capRefs.current[index]
      if (!mesh) return

      const p = reduced ? 1 : easeOutCubic((t - column.delay) / 0.9)
      const height = Math.max(column.height * p, 0.001)
      mesh.scale.y = height
      mesh.position.y = height / 2

      if (cap) {
        cap.position.y = height
        cap.scale.setScalar(Math.max(p, 0.001))
      }

      if (column.weak) {
        // The one difference in the scene, so it is the one thing that moves.
        const pulse = reduced ? 1 : 1 + Math.sin(t * 1.6) * 0.3
        mesh.material.emissiveIntensity = palette.weakLit * pulse * p
      }
    })
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.4, 48]} />
        <meshStandardMaterial color={palette.floor} roughness={0.95} metalness={0} />
      </mesh>

      {columns.map((column, index) => (
        <group key={index} position={[column.x, 0, 0]}>
          <mesh ref={(el) => (refs.current[index] = el)}>
            <cylinderGeometry args={[RADIUS, RADIUS, 1, 24]} />
            <meshStandardMaterial
              color={column.weak ? palette.weak : palette.column}
              emissive={column.weak ? palette.weakEmissive : palette.columnEmissive}
              emissiveIntensity={palette.columnIdle}
              roughness={0.55}
              metalness={0.18}
            />
          </mesh>
          {/* a thin cap, so each column reads as a measured level rather than
              an extruded shape that happens to stop */}
          <mesh ref={(el) => (capRefs.current[index] = el)}>
            <cylinderGeometry args={[RADIUS * 1.14, RADIUS * 1.14, 0.07, 24]} />
            <meshStandardMaterial
              color={column.weak ? palette.weakCap : palette.cap}
              emissive={column.weak ? palette.weakEmissive : palette.columnEmissive}
              emissiveIntensity={column.weak ? palette.weakLit * 0.8 : palette.columnIdle}
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default function OptimusScene({ className }) {
  const reduced = usePrefersReducedMotion()
  const palette = useScenePalette(PALETTES)

  return (
    <SceneCanvas className={className} camera={{ position: [0, 1.9, 7.4], fov: 34 }}>
      <ambientLight intensity={palette.ambient.intensity} color={palette.ambient.color} />
      <directionalLight
        position={[4, 8, 6]}
        intensity={palette.directional.intensity}
        color={palette.directional.color}
      />
      <pointLight
        position={[0, 1.2, 3.2]}
        intensity={palette.point.intensity}
        color={palette.point.color}
        distance={12}
      />
      <Columns reduced={reduced} palette={palette} />
    </SceneCanvas>
  )
}
