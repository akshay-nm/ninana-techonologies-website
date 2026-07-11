'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import SceneCanvas, { usePrefersReducedMotion } from './SceneCanvas'
import { useScenePalette } from './HeroScene'

const PALETTES = {
  dark: {
    fog: '#05080f',
    ground: '#263352',
    slab: '#5568a0',
    body: '#2e3d68',
    crane: '#fb923c',
    craneLight: '#fdba74',
    craneEmissive: '#7c2d12',
    cable: '#a8b6cc',
    hookEmissive: '#f97316',
    grid: ['#5a4030', '#1a2743'],
    ambient: { intensity: 0.7, color: '#ffd9b0' },
    directional: { intensity: 1.3, color: '#ffe8cf' },
    point: { intensity: 0.5, color: '#fb923c' },
  },
  light: {
    fog: '#f8fafc',
    ground: '#cbd5e1',
    slab: '#94a3b8',
    body: '#e2e8f0',
    crane: '#ea580c',
    craneLight: '#f97316',
    craneEmissive: '#7c2d12',
    cable: '#64748b',
    hookEmissive: '#ea580c',
    grid: ['#c9a892', '#e4e9f0'],
    ambient: { intensity: 0.95, color: '#ffffff' },
    directional: { intensity: 1.7, color: '#ffffff' },
    point: { intensity: 0.25, color: '#ea580c' },
  },
}

const FLOORS = 7
const FLOOR_HEIGHT = 0.62
const CYCLE = 13 // seconds: build, hold, reset

const clamp01 = (v) => Math.min(Math.max(v, 0), 1)
// slight overshoot so floors "settle" into place
const easeOutBack = (p) => {
  const c1 = 1.2
  const q = clamp01(p) - 1
  return 1 + (c1 + 1) * q * q * q + c1 * q * q
}

function floorProgress(time, index, reduced) {
  if (reduced) return 1
  const t = time % CYCLE
  const appearAt = 0.6 + index * 0.75
  if (t > CYCLE - 1) {
    // quick teardown before the loop restarts
    return clamp01(1 - (t - (CYCLE - 1)) / 0.5)
  }
  return clamp01((t - appearAt) / 0.6)
}

function Site({ reduced, palette }) {
  const groupRef = useRef()
  const floorRefs = useRef([])
  const jibRef = useRef()
  const hookRef = useRef()
  const cableRef = useRef()
  const pointerRef = useRef({ x: 0, y: 0 })

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    const smoothed = pointerRef.current
    smoothed.x += (pointer.x - smoothed.x) * 0.05
    smoothed.y += (pointer.y - smoothed.y) * 0.05

    if (groupRef.current) {
      groupRef.current.rotation.y = -0.4 + smoothed.x * 0.25
      groupRef.current.rotation.x = smoothed.y * -0.04
    }

    floorRefs.current.forEach((floor, index) => {
      if (!floor) return
      const p = floorProgress(t, index, reduced)
      const eased = easeOutBack(p)
      const targetY = 0.1 + index * FLOOR_HEIGHT
      floor.position.y = targetY + (1 - eased) * 2.4
      floor.scale.setScalar(Math.max(p, 0.001))
    })

    // crane slews back and forth; hook rises and falls
    if (jibRef.current && !reduced) {
      jibRef.current.rotation.y = Math.sin(t * 0.4) * 0.7
    }
    if (hookRef.current && cableRef.current) {
      const drop = reduced ? 1.6 : 1.6 + Math.sin(t * 0.7) * 0.9
      hookRef.current.position.y = -drop
      cableRef.current.position.y = -drop / 2
      cableRef.current.scale.y = drop
    }
  })

  return (
    <group ref={groupRef} position={[-0.4, -1.6, 0]}>
      {/* ground slab */}
      <mesh position={[0.6, -0.06, 0]}>
        <boxGeometry args={[7, 0.14, 4.6]} />
        <meshStandardMaterial color={palette.ground} roughness={0.95} />
      </mesh>

      {/* rising floors */}
      {Array.from({ length: FLOORS }, (_, index) => (
        <group key={index} ref={(el) => (floorRefs.current[index] = el)}>
          <mesh position={[0, FLOOR_HEIGHT - 0.06, 0]}>
            <boxGeometry args={[2.7, 0.12, 2.3]} />
            <meshStandardMaterial color={palette.slab} roughness={0.7} />
          </mesh>
          <mesh position={[0, FLOOR_HEIGHT / 2 - 0.06, 0]}>
            <boxGeometry args={[2.45, FLOOR_HEIGHT - 0.12, 2.05]} />
            <meshStandardMaterial color={palette.body} roughness={0.85} />
          </mesh>
        </group>
      ))}

      {/* tower crane */}
      <group position={[2.6, 0, -0.4]}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.6, 0.2, 0.6]} />
          <meshStandardMaterial color={palette.crane} roughness={0.6} />
        </mesh>
        <mesh position={[0, 2.6, 0]}>
          <boxGeometry args={[0.16, 5.2, 0.16]} />
          <meshStandardMaterial color={palette.crane} emissive={palette.craneEmissive} emissiveIntensity={0.4} roughness={0.5} />
        </mesh>
        <group ref={jibRef} position={[0, 5.2, 0]}>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.28, 0.28, 0.28]} />
            <meshStandardMaterial color={palette.craneLight} roughness={0.5} />
          </mesh>
          {/* jib toward the building, counter-jib behind */}
          <mesh position={[-1.6, 0.1, 0]}>
            <boxGeometry args={[3.2, 0.12, 0.12]} />
            <meshStandardMaterial color={palette.crane} roughness={0.5} />
          </mesh>
          <mesh position={[0.85, 0.1, 0]}>
            <boxGeometry args={[1.1, 0.14, 0.14]} />
            <meshStandardMaterial color={palette.crane} roughness={0.5} />
          </mesh>
          {/* cable + hook hang from the jib tip */}
          <group position={[-2.9, 0, 0]}>
            <mesh ref={cableRef}>
              <boxGeometry args={[0.03, 1, 0.03]} />
              <meshStandardMaterial color={palette.cable} roughness={0.4} />
            </mesh>
            <mesh ref={hookRef}>
              <boxGeometry args={[0.22, 0.22, 0.22]} />
              <meshStandardMaterial color={palette.craneLight} emissive={palette.hookEmissive} emissiveIntensity={0.8} roughness={0.4} />
            </mesh>
          </group>
        </group>
      </group>

      <gridHelper args={[30, 30, palette.grid[0], palette.grid[1]]} position={[0.6, 0.02, 0]} />
    </group>
  )
}

export default function PragatiScene({ className }) {
  const reduced = usePrefersReducedMotion()
  const palette = useScenePalette(PALETTES)

  return (
    <SceneCanvas
      className={className}
      camera={{ position: [6.4, 4.4, 7.6], fov: 35 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.9, 0)}
    >
      <fog attach="fog" args={[palette.fog, 14, 26]} />
      <ambientLight intensity={palette.ambient.intensity} color={palette.ambient.color} />
      <directionalLight position={[8, 12, 5]} intensity={palette.directional.intensity} color={palette.directional.color} />
      <pointLight position={[-5, 3, 4]} intensity={palette.point.intensity} color={palette.point.color} />
      <Site reduced={reduced} palette={palette} />
    </SceneCanvas>
  )
}
