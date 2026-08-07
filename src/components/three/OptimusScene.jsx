'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import SceneCanvas, { usePrefersReducedMotion } from './SceneCanvas'
import { useScenePalette } from './HeroScene'

/**
 * The argument Optimus makes, as one image.
 *
 * A paper rests on a few pillars — the areas it examines you on. They are not
 * equal, so the paper sits tilted. Effort drifts around all of them at once,
 * spread evenly over pillars that are already strong, which is what studying
 * without a diagnosis looks like: real work, aimed at nothing in particular.
 *
 * Then the scan passes through. Every pillar is measured, the short one keeps
 * its glow, and the drifting effort collects into a stream pointed at it. It
 * grows, and the paper settles level.
 *
 * The pillars are deliberately unlabelled. They read as chapters, subjects or
 * whatever else the viewer's own exam is divided into, and the scene stays as
 * abstract as the three it sits beside.
 */

const PALETTES = {
  dark: {
    pillar: '#26364e',
    pillarEmissive: '#0f766e',
    pillarIdle: 0.18,
    weak: '#0a2f2c',
    weakEmissive: '#2dd4bf',
    weakLit: 1.25,
    paper: '#e9eff4',
    paperLine: '#7f93ab',
    mote: '#5eead4',
    moteEmissive: '#2dd4bf',
    scan: '#2dd4bf',
    ambient: { intensity: 0.55, color: '#d8fbf5' },
    directional: { intensity: 1.05, color: '#f2fffd' },
    point: { intensity: 0.9, color: '#2dd4bf' },
  },
  light: {
    pillar: '#cbd5e1',
    pillarEmissive: '#000000',
    pillarIdle: 0,
    weak: '#99f6e4',
    weakEmissive: '#0d9488',
    weakLit: 0.75,
    paper: '#ffffff',
    paperLine: '#c3ceda',
    mote: '#14b8a6',
    moteEmissive: '#0d9488',
    scan: '#0d9488',
    ambient: { intensity: 1.05, color: '#ffffff' },
    directional: { intensity: 1.5, color: '#ffffff' },
    point: { intensity: 0.3, color: '#0d9488' },
  },
}

/**
 * Five pillars, with the weak one at an end rather than in the middle: a rigid
 * paper tilts off a short end, but it would have to sag over a short middle,
 * and sag is not a shape a sheet of paper makes convincingly.
 */
const PILLARS = [
  { x: -2.45, z: 0.28, height: 2.55 },
  { x: -1.22, z: -0.26, height: 2.9 },
  { x: 0.0, z: 0.24, height: 2.68 },
  { x: 1.22, z: -0.22, height: 2.42 },
  { x: 2.45, z: 0.3, height: 1.05, weak: true },
]

const WEAK = PILLARS.findIndex((p) => p.weak)
const GROWN = 2.72
const MOTES = 46

/* The loop, in seconds. */
const CHAOS_END = 2.6
const SCAN_END = 4.1
const FOCUS_END = 7.4
const LEVEL_END = 8.8
const CYCLE = 9.6

const clamp01 = (p) => Math.min(Math.max(p, 0), 1)
const easeInOut = (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
const easeOut = (p) => 1 - Math.pow(1 - clamp01(p), 3)

function buildMotes() {
  // Deterministic rather than Math.random: the same arrangement every load
  // means the composition can be judged once and trusted.
  const motes = []
  for (let i = 0; i < MOTES; i++) {
    const home = i % PILLARS.length
    const golden = (i * 2.399963) % (Math.PI * 2)
    motes.push({
      home,
      angle: golden,
      radius: 0.72 + ((i * 37) % 11) / 22,
      lift: 0.5 + ((i * 53) % 17) / 9,
      speed: 0.34 + ((i * 29) % 13) / 46,
      bob: ((i * 17) % 19) / 19,
      // Staggered so the stream forms as a stream rather than a single lurch.
      focusDelay: ((i * 13) % 100) / 100,
    })
  }
  return motes
}

function Diorama({ reduced, palette }) {
  const groupRef = useRef()
  const paperRef = useRef()
  const scanRef = useRef()
  const pillarRefs = useRef([])
  const moteRefs = useRef([])
  const pointerRef = useRef({ x: 0, y: 0 })
  const motes = useMemo(buildMotes, [])

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    const smoothed = pointerRef.current
    smoothed.x += (pointer.x - smoothed.x) * 0.05
    smoothed.y += (pointer.y - smoothed.y) * 0.05

    if (groupRef.current) {
      const sway = reduced ? 0 : Math.sin(t * 0.19) * 0.05
      groupRef.current.rotation.y = smoothed.x * 0.3 + sway - 0.12
      groupRef.current.rotation.x = smoothed.y * -0.14
    }

    const cycle = reduced ? SCAN_END : t % CYCLE

    // How far the weak pillar has been repaired, 0 → 1.
    const repair = easeInOut(clamp01((cycle - SCAN_END) / (FOCUS_END - SCAN_END)))
    const weakHeight = PILLARS[WEAK].height + (GROWN - PILLARS[WEAK].height) * repair

    // Everything fades out over the last moment so the reset happens while
    // nothing is on screen, instead of snapping back in full view.
    const fade = reduced ? 1 : 1 - easeOut((cycle - LEVEL_END) / (CYCLE - LEVEL_END))

    /* ── pillars ── */
    pillarRefs.current.forEach((mesh, index) => {
      if (!mesh) return
      const pillar = PILLARS[index]
      const height = index === WEAK ? weakHeight : pillar.height
      mesh.scale.y = height
      mesh.position.y = height / 2

      // Each pillar answers as the scan crosses it, left to right, and the
      // weak one keeps its glow once the sweep has gone by.
      const sweep = clamp01((cycle - CHAOS_END) / (SCAN_END - CHAOS_END))
      const reached = sweep > index / PILLARS.length
      const measuring = reached && sweep < index / PILLARS.length + 0.28
      if (index === WEAK) {
        const pulse = reduced ? 1 : 1 + Math.sin(t * 2.1) * 0.28
        mesh.material.emissiveIntensity = reached ? palette.weakLit * pulse * fade : palette.pillarIdle
      } else {
        mesh.material.emissiveIntensity = (measuring ? palette.weakLit * 0.55 : palette.pillarIdle) * fade
      }
    })

    /* ── the paper, tilting off the short end ── */
    if (paperRef.current) {
      const left = (PILLARS[0].height + PILLARS[1].height) / 2
      const right = (PILLARS[3].height + weakHeight) / 2
      paperRef.current.rotation.z = (left - right) * 0.19
      paperRef.current.position.y = (left + right) / 2 + 0.34
    }

    /* ── the scan ── */
    if (scanRef.current) {
      const active = cycle > CHAOS_END && cycle < SCAN_END
      scanRef.current.visible = !reduced && active
      if (active) {
        const p = (cycle - CHAOS_END) / (SCAN_END - CHAOS_END)
        scanRef.current.position.x = -3.6 + p * 7.2
        scanRef.current.material.opacity = Math.sin(p * Math.PI) * 0.75
      }
    }

    /* ── effort ── */
    const target = PILLARS[WEAK]
    moteRefs.current.forEach((mesh, index) => {
      if (!mesh) return
      const mote = motes[index]
      const home = PILLARS[mote.home]

      // Where it drifts when nothing is telling it where to go.
      const a = mote.angle + (reduced ? 0 : t * mote.speed)
      const wander = {
        x: home.x + Math.cos(a) * mote.radius,
        y: mote.lift + (reduced ? 0 : Math.sin(t * 0.9 + mote.bob * 6) * 0.16),
        z: home.z + Math.sin(a) * mote.radius,
      }

      // Where it goes once the weak pillar has been named.
      const pull = easeInOut(
        clamp01((cycle - SCAN_END - mote.focusDelay * 0.7) / (FOCUS_END - SCAN_END - 0.7))
      )
      mesh.position.x = wander.x + (target.x - wander.x) * pull
      mesh.position.y = wander.y + (weakHeight + 0.3 - wander.y) * pull
      mesh.position.z = wander.z + (target.z - wander.z) * pull

      // Absorbed on arrival — the effort becomes the pillar.
      const absorbed = easeOut((pull - 0.82) / 0.18)
      const scale = (1 - absorbed) * fade
      mesh.scale.setScalar(Math.max(scale, 0.0001))
      mesh.material.opacity = scale
    })
  })

  return (
    <group ref={groupRef} position={[0, -1.55, 0]}>
      {/* the paper the pillars are holding up */}
      <group ref={paperRef}>
        <mesh>
          <boxGeometry args={[6.5, 0.075, 3.3]} />
          <meshStandardMaterial color={palette.paper} roughness={0.85} metalness={0.02} />
        </mesh>
        {/* faint question rows, so it reads as a paper rather than a slab */}
        {[-1.02, -0.5, 0.02, 0.54, 1.06].map((z, index) => (
          <mesh key={z} position={[index % 2 === 0 ? -0.35 : -0.75, 0.045, z]}>
            <boxGeometry args={[index % 2 === 0 ? 4.6 : 3.8, 0.02, 0.075]} />
            <meshStandardMaterial color={palette.paperLine} roughness={0.9} />
          </mesh>
        ))}
      </group>

      {PILLARS.map((pillar, index) => (
        <mesh
          key={index}
          ref={(el) => (pillarRefs.current[index] = el)}
          position={[pillar.x, pillar.height / 2, pillar.z]}
        >
          <boxGeometry args={[0.82, 1, 0.82]} />
          <meshStandardMaterial
            color={pillar.weak ? palette.weak : palette.pillar}
            emissive={pillar.weak ? palette.weakEmissive : palette.pillarEmissive}
            emissiveIntensity={palette.pillarIdle}
            roughness={0.62}
            metalness={0.16}
          />
        </mesh>
      ))}

      <mesh ref={scanRef} rotation={[0, Math.PI / 2, 0]} position={[0, 1.6, 0]}>
        <planeGeometry args={[3.4, 3.4]} />
        <meshBasicMaterial color={palette.scan} transparent opacity={0} depthWrite={false} />
      </mesh>

      {motes.map((mote, index) => (
        <mesh key={index} ref={(el) => (moteRefs.current[index] = el)}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial
            color={palette.mote}
            emissive={palette.moteEmissive}
            emissiveIntensity={0.8}
            roughness={0.4}
            transparent
            opacity={1}
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
    <SceneCanvas className={className} camera={{ position: [0.4, 2.4, 8.4], fov: 36 }}>
      <ambientLight intensity={palette.ambient.intensity} color={palette.ambient.color} />
      <directionalLight
        position={[5, 8, 6]}
        intensity={palette.directional.intensity}
        color={palette.directional.color}
      />
      <pointLight
        position={[2.6, 1.4, 3.2]}
        intensity={palette.point.intensity}
        color={palette.point.color}
        distance={13}
      />
      <Diorama reduced={reduced} palette={palette} />
    </SceneCanvas>
  )
}
