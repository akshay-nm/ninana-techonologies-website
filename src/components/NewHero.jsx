'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
})

const enter = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] },
})

export default function NewHero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* 3D city block */}
      <HeroScene className="absolute inset-0 opacity-50 sm:opacity-100" />

      {/* Scrim so text stays readable over the scene */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent dark:from-ink dark:via-ink/70 sm:via-slate-50/40 dark:sm:via-ink/40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50 to-transparent dark:from-ink" />

      <div className="container relative z-10 mx-auto px-4 pt-14">
        <div className="max-w-2xl">
          <motion.p
            className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-400/90"
            {...enter(0.1)}
          >
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500 dark:bg-cyan-400" />
            Ninana Technologies · Gandhinagar, India
          </motion.p>

          <motion.h1
            className="mb-8 text-5xl font-medium leading-[1.08] tracking-[-0.02em] text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            {...enter(0.25)}
          >
            Software for industries that{' '}
            <span className="text-slate-500 dark:text-slate-400">still run on paper.</span>
          </motion.h1>

          <motion.p
            className="mb-10 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl"
            {...enter(0.4)}
          >
            Ninana is a small product studio in Gandhinagar. We build
            software for construction, real estate, and legal practice.
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-4" {...enter(0.55)}>
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-ink dark:hover:bg-cyan-300"
            >
              See what we build
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-900/15 px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-900/30 hover:bg-slate-900/5 dark:border-white/15 dark:text-slate-200 dark:hover:border-white/30 dark:hover:bg-white/5"
            >
              Work with us
            </a>
          </motion.div>

          <motion.div
            className="mt-16 flex items-center gap-8 text-sm text-slate-500 dark:text-slate-400"
            {...enter(0.7)}
          >
            {[
              ['Vivid', 'real estate', 'text-cyan-600 dark:text-cyan-400'],
              ['Pragati', 'construction', 'text-orange-600 dark:text-orange-400'],
              ['Wasp', 'legal', 'text-amber-600 dark:text-amber-400'],
            ].map(([name, industry, accent]) => (
              <a
                key={name}
                href={`#${name.toLowerCase()}`}
                className="group flex flex-col gap-0.5"
              >
                <span className={`font-semibold ${accent} transition group-hover:brightness-125`}>
                  {name}
                </span>
                <span className="text-xs uppercase tracking-wider">{industry}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
