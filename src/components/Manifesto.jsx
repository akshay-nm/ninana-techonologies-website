'use client'

import { motion } from 'framer-motion'

const STATEMENT = ['Paper', 'is', 'the', 'competition.']

export default function Manifesto() {
  return (
    <section id="manifesto" className="relative scroll-mt-14 border-t border-slate-900/10 py-28 dark:border-white/5 lg:py-40">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <motion.p
            className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            Why we exist
          </motion.p>

          <h2 className="mb-10 text-5xl font-medium leading-[1.05] tracking-[-0.02em] text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            {STATEMENT.map((word, index) => (
              <motion.span
                key={word}
                className={`inline-block ${
                  index < STATEMENT.length - 1 ? 'mr-[0.24em]' : ''
                } ${index === 0 ? 'text-cyan-600 dark:text-cyan-400' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            className="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            Our users don&apos;t compare us to other software. They compare us
            to registers, phone calls, and WhatsApp forwards. Software only
            wins when it&apos;s easier than the habit it replaces.
            That&apos;s what we build for.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
