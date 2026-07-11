'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
}

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-14 border-t border-slate-900/10 py-24 dark:border-white/5 lg:py-32">
      {/* single, intentional glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <motion.div className="mx-auto max-w-2xl text-center" {...fadeUp}>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            Contact
          </p>
          <h2 className="mb-6 text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-slate-900 dark:text-white sm:text-5xl">
            Get in touch.
          </h2>
          <p className="mb-10 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            Partnerships, products, joining the team. One inbox, and we
            read everything.
          </p>

          <a
            href="mailto:contact@ninana.in"
            className="inline-flex items-center gap-3 rounded-full bg-cyan-500 px-8 py-4 text-base font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-ink dark:hover:bg-cyan-300"
          >
            contact@ninana.in
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7m0 0H8m9 0v9" />
            </svg>
          </a>

          <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
            Looking for a product demo? Go straight to{' '}
            <a href="https://vivid.ninana.in" target="_blank" rel="noopener noreferrer" className="font-medium text-cyan-600 hover:underline dark:text-cyan-400">Vivid</a>,{' '}
            <a href="https://pragati.ninana.in/" target="_blank" rel="noopener noreferrer" className="font-medium text-orange-600 hover:underline dark:text-orange-400">Pragati</a>, or{' '}
            <a href="https://wasp.ninana.in/" target="_blank" rel="noopener noreferrer" className="font-medium text-amber-600 hover:underline dark:text-amber-400">Wasp</a>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
