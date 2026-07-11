'use client'

import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const onChange = (event) => setReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}

// Mounts the WebGL canvas only once the section approaches the viewport and
// pauses the render loop while it is scrolled out of view.
export default function SceneCanvas({ children, className, ...props }) {
  const holderRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = holderRef.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setStarted(true)
      },
      { rootMargin: '200px' }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={holderRef} className={className}>
      {started && (
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          frameloop={visible ? 'always' : 'never'}
          {...props}
        >
          {children}
        </Canvas>
      )}
    </div>
  )
}
