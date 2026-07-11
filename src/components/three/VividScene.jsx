'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import SceneCanvas, { usePrefersReducedMotion } from './SceneCanvas'
import { useScenePalette } from './HeroScene'

const easeOutCubic = (p) => 1 - Math.pow(1 - Math.min(Math.max(p, 0), 1), 3)

const PALETTES = {
  dark: {
    structure: '#3b4f86',
    floor: '#48598c',
    furnitureA: '#6b80b8',
    furnitureB: '#7e93cb',
    rug: '#54679e',
    windowEmissive: '#22d3ee',
    windowIntensity: 1.4,
    lampEmissive: '#67e8f9',
    edges: '#22d3ee',
    edgesOpacity: 0.7,
    ambient: { intensity: 1.0, color: '#a9c1ff' },
    directional: { intensity: 1.7, color: '#e6eeff' },
    point: { intensity: 2.2, color: '#22d3ee' },
  },
  light: {
    structure: '#e2e8f0',
    floor: '#cbd5e1',
    furnitureA: '#94a8cf',
    furnitureB: '#aebfe0',
    rug: '#b3c2de',
    windowEmissive: '#06b6d4',
    windowIntensity: 0.7,
    lampEmissive: '#0891b2',
    edges: '#0891b2',
    edgesOpacity: 0.6,
    ambient: { intensity: 1.0, color: '#ffffff' },
    directional: { intensity: 1.8, color: '#ffffff' },
    point: { intensity: 0.9, color: '#06b6d4' },
  },
}

// A cutaway apartment diorama — the archviz walkthrough metaphor.
function buildPieces(palette) {
  return [
    // structure
    { size: [4.6, 0.18, 4.6], pos: [0, -0.09, 0], color: palette.floor, delay: 0.0, edges: true },
    { size: [4.6, 2.7, 0.16], pos: [0, 1.35, -2.22], color: palette.structure, delay: 0.15, edges: true },
    { size: [0.16, 2.7, 4.6], pos: [-2.22, 1.35, 0], color: palette.structure, delay: 0.3, edges: true },
    // glowing window on the back wall
    { size: [1.7, 1.1, 0.06], pos: [0.7, 1.5, -2.12], color: '#0b1120', emissive: palette.windowEmissive, intensity: palette.windowIntensity, delay: 0.5 },
    // furniture
    { size: [1.7, 0.42, 2.1], pos: [-1.2, 0.21, -1.0], color: palette.furnitureA, delay: 0.65 }, // bed
    { size: [1.7, 0.7, 0.14], pos: [-1.2, 0.35, -2.1], color: palette.furnitureB, delay: 0.75 }, // headboard
    { size: [0.75, 0.5, 1.9], pos: [-1.75, 0.25, 1.2], color: palette.furnitureA, delay: 0.85 }, // sofa
    { size: [0.9, 0.48, 0.9], pos: [1.3, 0.24, 0.6], color: palette.furnitureB, delay: 0.95 }, // table
    { size: [0.16, 0.5, 0.16], pos: [1.3, 0.73, 0.6], color: '#0b1120', emissive: palette.lampEmissive, intensity: 1.2, delay: 1.1 }, // lamp
    { size: [1.6, 0.04, 1.6], pos: [0.2, 0.02, 1.6], color: palette.rug, delay: 1.05 }, // rug
  ]
}

function Room({ reduced, palette }) {
  const groupRef = useRef()
  const refs = useRef([])
  const pointerRef = useRef({ x: 0, y: 0 })

  const pieces = useMemo(() => buildPieces(palette), [palette])
  const edgeGeometries = useMemo(
    () =>
      pieces.map((piece) =>
        piece.edges ? new THREE.EdgesGeometry(new THREE.BoxGeometry(...piece.size)) : null
      ),
    [pieces]
  )

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    const smoothed = pointerRef.current
    smoothed.x += (pointer.x - smoothed.x) * 0.05
    smoothed.y += (pointer.y - smoothed.y) * 0.05

    if (groupRef.current) {
      const sway = reduced ? 0 : Math.sin(t * 0.25) * 0.32
      groupRef.current.rotation.y = -0.5 + sway + smoothed.x * 0.25
      groupRef.current.rotation.x = smoothed.y * -0.05
    }

    refs.current.forEach((mesh, index) => {
      if (!mesh) return
      const p = reduced ? 1 : easeOutCubic((t - pieces[index].delay) / 0.7)
      mesh.scale.setScalar(Math.max(p, 0.001))
    })
  })

  return (
    <group ref={groupRef} position={[0, -0.9, 0]}>
      {pieces.map((piece, index) => (
        <mesh
          key={index}
          ref={(el) => (refs.current[index] = el)}
          position={piece.pos}
        >
          <boxGeometry args={piece.size} />
          <meshStandardMaterial
            color={piece.color}
            roughness={0.8}
            metalness={0.1}
            emissive={piece.emissive || '#000000'}
            emissiveIntensity={piece.emissive ? piece.intensity : 0}
          />
          {edgeGeometries[index] && (
            <lineSegments geometry={edgeGeometries[index]}>
              <lineBasicMaterial
                color={palette.edges}
                transparent
                opacity={palette.edgesOpacity}
              />
            </lineSegments>
          )}
        </mesh>
      ))}
    </group>
  )
}

export default function VividScene({ className }) {
  const reduced = usePrefersReducedMotion()
  const palette = useScenePalette(PALETTES)

  return (
    <SceneCanvas
      className={className}
      camera={{ position: [5.2, 4.6, 5.8], fov: 34 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.3, 0)}
    >
      <ambientLight intensity={palette.ambient.intensity} color={palette.ambient.color} />
      <directionalLight position={[6, 8, 4]} intensity={palette.directional.intensity} color={palette.directional.color} />
      <pointLight position={[0.7, 1.6, -1.4]} intensity={palette.point.intensity} color={palette.point.color} distance={8} />
      <Room reduced={reduced} palette={palette} />
    </SceneCanvas>
  )
}
