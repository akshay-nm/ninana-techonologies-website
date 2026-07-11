'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
}

const STATS = [
  { value: '2020', label: 'Founded' },
  { value: '3', label: 'Products in production' },
  { value: 'Gandhinagar', label: 'Built in Gujarat, India' },
  { value: 'Hiring', label: 'Engineers & designers' },
]

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-14 border-t border-slate-900/10 py-24 dark:border-white/5 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div {...fadeUp}>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              About
            </p>
            <h2 className="mb-6 text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-slate-900 dark:text-white sm:text-5xl">
              A small studio building serious tools.
            </h2>
            <p className="mb-5 max-w-lg text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              Ninana Technologies is a product company from Gandhinagar. We pick
              industries where the day-to-day work still lives on paper, phone
              calls, and spreadsheets — then build the software layer they
              deserve.
            </p>
            <p className="max-w-lg text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              We go deep rather than wide: each product is built alongside the
              people who use it — real-estate sales teams, site engineers, and
              practicing lawyers.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-slate-900/10 bg-slate-900/10 dark:border-white/5 dark:bg-white/5"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-white p-8 dark:bg-ink-soft">
                <div className="mb-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
