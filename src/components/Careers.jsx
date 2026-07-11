'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
}

export default function Careers() {
  return (
    <section id="careers" className="relative scroll-mt-14 border-t border-slate-900/10 py-24 dark:border-white/5 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div className="mx-auto max-w-2xl" {...fadeUp}>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            Careers
          </p>
          <h2 className="mb-6 text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-slate-900 dark:text-white sm:text-5xl">
            We&apos;re hiring.
          </h2>
          <p className="mb-10 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            Engineers and designers. It&apos;s a small team, so you&apos;ll
            work across the whole product and ship to real users early. Based
            in Gandhinagar.
          </p>
          <a
            href="mailto:contact@ninana.in?subject=Careers"
            className="inline-flex items-center gap-2 rounded-full border border-slate-900/15 px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-900/30 hover:bg-slate-900/5 dark:border-white/15 dark:text-slate-200 dark:hover:border-white/30 dark:hover:bg-white/5"
          >
            Write to us
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7m0 0H8m9 0v9" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
