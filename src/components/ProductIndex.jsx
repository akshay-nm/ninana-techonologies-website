'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const VividScene = dynamic(() => import('@/components/three/VividScene'), { ssr: false })
const PragatiScene = dynamic(() => import('@/components/three/PragatiScene'), { ssr: false })
const WaspScene = dynamic(() => import('@/components/three/WaspScene'), { ssr: false })

const PRODUCTS = [
  {
    id: 'vivid',
    name: 'Vivid',
    industry: 'Real estate',
    line: '3D walkthroughs buyers can explore in the browser, before the flat is built.',
    href: 'https://vivid.ninana.in',
    label: 'vivid.ninana.in',
    accent: {
      text: 'text-cyan-600 dark:text-cyan-400',
      border: 'hover:border-cyan-500/50 dark:hover:border-cyan-400/40',
      tag: 'bg-cyan-500/10 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300',
    },
    Scene: VividScene,
  },
  {
    id: 'pragati',
    name: 'Pragati',
    industry: 'Construction',
    line: 'Demands, site progress, money, and materials for builders. All in one place.',
    href: 'https://pragati.ninana.in/',
    label: 'pragati.ninana.in',
    accent: {
      text: 'text-orange-600 dark:text-orange-400',
      border: 'hover:border-orange-500/50 dark:hover:border-orange-400/40',
      tag: 'bg-orange-500/10 text-orange-700 dark:bg-orange-400/10 dark:text-orange-300',
    },
    Scene: PragatiScene,
  },
  {
    id: 'wasp',
    name: 'Wasp',
    industry: 'Legal practice',
    line: 'Matters, drafting, conflicts, calendar, and billing for Indian law firms.',
    href: 'https://wasp.ninana.in/',
    label: 'wasp.ninana.in',
    accent: {
      text: 'text-amber-600 dark:text-amber-400',
      border: 'hover:border-amber-500/50 dark:hover:border-amber-400/40',
      tag: 'bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',
    },
    Scene: WaspScene,
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
}

export default function ProductIndex() {
  return (
    <section id="products" className="relative scroll-mt-14 border-t border-slate-900/10 py-24 dark:border-white/5 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div className="mb-14 max-w-2xl lg:mb-20" {...fadeUp}>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            What we build
          </p>
          <h2 className="mb-4 text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-slate-900 dark:text-white sm:text-5xl">
            Three products, three industries.
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Each has its own site. That&apos;s where the details live.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PRODUCTS.map((product, index) => {
            const { Scene, accent } = product
            return (
              <motion.div
                key={product.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.12 }}
              >
                <a
                  id={product.id}
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block h-full scroll-mt-24 overflow-hidden rounded-3xl border border-slate-900/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/5 dark:bg-ink-soft dark:shadow-none ${accent.border}`}
                >
                  <div className="relative aspect-[16/11]">
                    <Scene className="absolute inset-0" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xl font-semibold text-slate-900 dark:text-white">
                        {product.name}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${accent.tag}`}>
                        {product.industry}
                      </span>
                    </div>
                    <p className="mb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {product.line}
                    </p>
                    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${accent.text}`}>
                      {product.label}
                      <svg
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7m0 0H8m9 0v9" />
                      </svg>
                    </span>
                  </div>
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
