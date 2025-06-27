'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="hero" className="relative py-20 lg:py-32">
      {/* Premium Background */}
      <div className="dark:from-slate-950 dark:to-slate-950/80 absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50/80 dark:via-slate-900"></div>

      {/* Subtle texture overlay */}
      <div className="bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.005),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.01),transparent_70%)] absolute inset-0"></div>

      {/* Floating blurred elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-300/20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="from-purple-400/15 to-pink-300/15 absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-r blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-400/10 to-blue-300/10 blur-3xl"
          animate={{
            x: [-20, 20, -20],
            y: [-10, 10, -10],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            {/* Premium heading with refined typography */}
            <motion.h1
              className="mb-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text pb-2 text-5xl font-medium leading-[1.3] tracking-[-0.02em] text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400 sm:text-6xl md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              Ninana Technologies
            </motion.h1>

            {/* Refined subtitle with better spacing */}
            <motion.p
              className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl md:mb-12 md:text-2xl md:leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              Empowering businesses through{' '}
              <span className="font-medium text-slate-800 dark:text-slate-200">
                intuitive technology
              </span>{' '}
              that transforms complexity into simplicity.
            </motion.p>

            {/* Premium glassmorphism CTA button */}
            <motion.button
              onClick={() => {
                document.getElementById('products')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
              className="group relative mb-12 inline-flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 px-8 py-4 text-base font-medium text-slate-800 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 hover:shadow-xl hover:shadow-slate-900/10 focus:outline-none focus:ring-2 focus:ring-slate-400/50 dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-200 dark:shadow-slate-100/5 dark:hover:bg-slate-800/90 dark:hover:shadow-slate-100/10 dark:focus:ring-slate-600/50 sm:px-10 sm:py-5 sm:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 },
              }}
            >
              {/* Button gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

              {/* Button content */}
              <div className="relative flex items-center">
                <svg
                  className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                Explore Our Products
              </div>

              {/* Premium ring effect */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100"></div>
            </motion.button>

            {/* Smooth scroll indicator */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <motion.button
                onClick={() => {
                  document.getElementById('products')?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }}
                className="group flex flex-col items-center space-y-2 text-slate-400 transition-colors duration-300 hover:text-slate-600 dark:hover:text-slate-300"
                aria-label="Scroll to products section"
              >
                <span className="text-xs font-medium uppercase tracking-wider">
                  Scroll to explore
                </span>
                <motion.div
                  className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-current p-1"
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <motion.div
                    className="h-1 w-1 rounded-full bg-current"
                    animate={{ y: [0, 12, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
