'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const VividScene = dynamic(() => import('@/components/three/VividScene'), { ssr: false })
const PragatiScene = dynamic(() => import('@/components/three/PragatiScene'), { ssr: false })
const WaspScene = dynamic(() => import('@/components/three/WaspScene'), { ssr: false })

const CHAPTERS = [
  {
    id: 'vivid',
    index: '01',
    kicker: 'Architectural Visualization',
    name: 'Vivid',
    headline: 'Sell spaces people can walk through.',
    body: 'Vivid turns floor plans into interactive 3D walkthroughs that run in any browser — furnished sample flats, full site tours, no downloads. Buyers explore the space before a single brick is laid.',
    bullets: [
      'Interactive walkthroughs, straight from the browser',
      'Furnished sample flats buyers can explore themselves',
      'Built for real-estate sales teams, not render farms',
    ],
    link: 'https://vivid.ninana.in',
    linkLabel: 'vivid.ninana.in',
    accent: {
      text: 'text-cyan-600 dark:text-cyan-400',
      border: 'hover:border-cyan-400/40',
      glow: 'from-cyan-500/20',
      dot: 'bg-cyan-500 dark:bg-cyan-400',
    },
    Scene: VividScene,
  },
  {
    id: 'pragati',
    index: '02',
    kicker: 'Construction Management',
    name: 'Pragati',
    headline: 'Every site, every rupee, one ledger.',
    body: 'Pragati tracks demands, site progress, finances, and inventory across all your projects — so builders see exactly where every site stands without chasing phone calls and paper registers.',
    bullets: [
      'Demands and materials tracked from request to delivery',
      'Site progress and finances in one live view',
      'Inventory without the spreadsheet sprawl',
    ],
    link: 'https://pragati.ninana.in/',
    linkLabel: 'pragati.ninana.in',
    accent: {
      text: 'text-orange-600 dark:text-orange-400',
      border: 'hover:border-orange-400/40',
      glow: 'from-orange-500/20',
      dot: 'bg-orange-500 dark:bg-orange-400',
    },
    Scene: PragatiScene,
  },
  {
    id: 'wasp',
    index: '03',
    kicker: 'Legal Practice',
    name: 'Wasp',
    headline: 'The operating layer for Indian law firms.',
    body: 'Encrypted matter rooms, audited AI drafting, conflict checks, calendar, and billing — built for the way Indian law firms actually work, not the way software vendors wish they did.',
    bullets: [
      'Encrypted matter rooms for every engagement',
      'AI drafting with a full audit trail',
      'Conflicts, calendar, and billing in one place',
    ],
    link: 'https://wasp.ninana.in/',
    linkLabel: 'wasp.ninana.in',
    accent: {
      text: 'text-amber-600 dark:text-amber-400',
      border: 'hover:border-amber-400/40',
      glow: 'from-amber-500/20',
      dot: 'bg-amber-500 dark:bg-amber-400',
    },
    Scene: WaspScene,
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
}

function Chapter({ chapter, flip }) {
  const { accent, Scene } = chapter

  return (
    <div id={chapter.id} className="scroll-mt-24">
      <div
        className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
          flip ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* 3D scene */}
        <motion.div {...fadeUp} className="relative">
          <div
            className={`pointer-events-none absolute -inset-8 rounded-[3rem] bg-gradient-to-br ${accent.glow} to-transparent opacity-30 blur-3xl`}
          />
          <div
            className={`relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-900/10 bg-white shadow-sm transition-colors duration-500 dark:border-white/5 dark:bg-ink-soft dark:shadow-none ${accent.border}`}
          >
            <Scene className="absolute inset-0" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              <span>{chapter.index} / {chapter.name}</span>
              <span>interactive</span>
            </div>
          </div>
        </motion.div>

        {/* Story */}
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <p className={`mb-4 font-mono text-xs uppercase tracking-[0.25em] ${accent.text}`}>
            {chapter.index} · {chapter.kicker}
          </p>
          <h3 className="mb-5 text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            {chapter.headline}
          </h3>
          <p className="mb-8 max-w-lg text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            {chapter.body}
          </p>
          <ul className="mb-9 space-y-3">
            {chapter.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 sm:text-base">
                <span className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${accent.dot}`} />
                {bullet}
              </li>
            ))}
          </ul>
          <a
            href={chapter.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center gap-2 text-sm font-semibold ${accent.text}`}
          >
            {chapter.linkLabel}
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7m0 0H8m9 0v9" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default function ProductStory() {
  return (
    <section id="products" className="relative scroll-mt-14 py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div className="mb-20 max-w-2xl lg:mb-28" {...fadeUp}>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            The products
          </p>
          <h2 className="text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-slate-900 dark:text-white sm:text-5xl">
            Three industries.
            <br />
            <span className="text-slate-400 dark:text-slate-500">Three operating layers.</span>
          </h2>
        </motion.div>

        <div className="space-y-28 lg:space-y-40">
          {CHAPTERS.map((chapter, index) => (
            <Chapter key={chapter.id} chapter={chapter} flip={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
