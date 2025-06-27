'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden py-32 lg:py-40">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-purple-500/5"></div>

      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 h-full w-full opacity-30">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <motion.h1
              className="mb-8 text-6xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              Ninana Technologies
            </motion.h1>

            <motion.p
              className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300 md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            >
              Empowering people through intuitive technology that simplifies the
              complex.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              onClick={() => {
                document.getElementById('products')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
              className="mb-8 inline-flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-5 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:from-blue-700 hover:to-blue-800 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="mr-3 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Explore Our Products
            </motion.button>

            {/* Bouncing Arrow */}
            <motion.div
              className="cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
              onClick={() => {
                document.getElementById('products')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
            >
              <motion.svg
                className="mx-auto h-6 w-6 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </motion.svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
