'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import SceneCanvas, { usePrefersReducedMotion } from './SceneCanvas'
import { useScenePalette } from './HeroScene'

const PALETTES = {
  dark: {
    cell: '#26335c',
    cellEmissive: '#1b2952',
    cellIdleIntensity: 0.5,
    litCell: '#1a1206',
    litEmissive: '#f59e0b',
    litIntensity: 1.2,
    ambient: { intensity: 0.65, color: '#ffe6b8' },
    directional: { intensity: 1.1, color: '#fff1d6' },
    point: { intensity: 0.8, color: '#f59e0b' },
  },
  light: {
    cell: '#e2e8f0',
    cellEmissive: '#000000',
    cellIdleIntensity: 0,
    litCell: '#fde68a',
    litEmissive: '#d97706',
    litIntensity: 0.75,
    ambient: { intensity: 1.0, color: '#ffffff' },
    directional: { intensity: 1.6, color: '#ffffff' },
    point: { intensity: 0.3, color: '#d97706' },
  },
}

const easeOutCubic = (p) => 1 - Math.pow(1 - Math.min(Math.max(p, 0), 1), 3)

function buildCells() {
  const cells = []
  const RADIUS = 3
  for (let q = -RADIUS; q <= RADIUS; q++) {
    for (let r = -RADIUS; r <= RADIUS; r++) {
      if (Math.abs(q + r) > RADIUS) continue
      const x = (q + r / 2) * 1.14
      const y = r * 0.99
      const dist = Math.sqrt(x * x + y * y)
      cells.push({ x, y, dist, lit: false })
    }
  }
  // a few glowing "matter rooms"
  const litPicks = [0.0, 1.6, 2.4]
  for (const target of litPicks) {
    let best = null
    for (const cell of cells) {
      if (cell.lit) continue
      const score = Math.abs(cell.dist - target) + (cell.x < 0 === target % 2 < 1 ? 0.1 : 0)
      if (!best || score < best.score) best = { cell, score }
    }
    if (best) best.cell.lit = true
  }
  return cells
}

function Honeycomb({ reduced, palette }) {
  const groupRef = useRef()
  const refs = useRef([])
  const pointerRef = useRef({ x: 0, y: 0 })
  const cells = useMemo(buildCells, [])

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    const smoothed = pointerRef.current
    smoothed.x += (pointer.x - smoothed.x) * 0.05
    smoothed.y += (pointer.y - smoothed.y) * 0.05

    if (groupRef.current) {
      const sway = reduced ? 0 : Math.sin(t * 0.2) * 0.06
      groupRef.current.rotation.y = smoothed.x * 0.3 + sway
      groupRef.current.rotation.x = smoothed.y * -0.2
    }

    refs.current.forEach((mesh, index) => {
      if (!mesh) return
      const cell = cells[index]
      const p = reduced ? 1 : easeOutCubic((t - 0.2 - cell.dist * 0.25) / 0.6)
      mesh.scale.setScalar(Math.max(p, 0.001))
      mesh.position.z = reduced ? 0 : Math.sin(t * 1.1 + cell.dist * 1.2) * 0.07 * p
      if (cell.lit) {
        mesh.material.emissiveIntensity = reduced
          ? palette.litIntensity
          : (palette.litIntensity + Math.sin(t * 1.6 + cell.dist * 2) * 0.4 * palette.litIntensity) * p
      }
    })
  })

  return (
    <group ref={groupRef}>
      {cells.map((cell, index) => (
        <mesh
          key={index}
          ref={(el) => (refs.current[index] = el)}
          position={[cell.x, cell.y, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.52, 0.52, 0.3, 6]} />
          <meshStandardMaterial
            color={cell.lit ? palette.litCell : palette.cell}
            emissive={cell.lit ? palette.litEmissive : palette.cellEmissive}
            emissiveIntensity={cell.lit ? palette.litIntensity : palette.cellIdleIntensity}
            roughness={0.55}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function WaspScene({ className }) {
  const reduced = usePrefersReducedMotion()
  const palette = useScenePalette(PALETTES)

  return (
    <SceneCanvas
      className={className}
      camera={{ position: [0, 0, 8.6], fov: 35 }}
    >
      <ambientLight intensity={palette.ambient.intensity} color={palette.ambient.color} />
      <directionalLight position={[4, 6, 8]} intensity={palette.directional.intensity} color={palette.directional.color} />
      <pointLight position={[0, 0, 4]} intensity={palette.point.intensity} color={palette.point.color} distance={12} />
      <Honeycomb reduced={reduced} palette={palette} />
    </SceneCanvas>
  )
}
