'use client'

import { motion } from 'framer-motion'

export default function About() {
  const rightColumnVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const paragraphVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  }

  return (
    <section id="about" className="relative py-24 lg:py-32">
      {/* Premium Background */}
      <div className="dark:from-slate-950/50 dark:to-slate-950/30 absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white/80 to-slate-50/30 dark:via-slate-900/80"></div>

      {/* Subtle texture overlay */}
      <div className="bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.02),transparent_50%),radial-gradient(circle_at_30%_70%,rgba(147,51,234,0.02),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.05),transparent_50%),radial-gradient(circle_at_30%_70%,rgba(147,51,234,0.05),transparent_50%)] absolute inset-0"></div>

      {/* Floating background element */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="from-blue-400/8 to-purple-400/8 absolute top-40 right-10 h-64 w-64 rounded-full bg-gradient-to-r blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Premium two-column layout */}
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left column: Enhanced heading section */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              {/* Premium heading with gradient text */}
              <div className="space-y-6">
                <motion.h2
                  className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-4xl font-medium leading-[1.2] tracking-[-0.02em] text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400 sm:text-5xl lg:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >
                  About Ninana
                </motion.h2>

                {/* Animated gradient underline */}
                <motion.div
                  className="relative h-1 w-20 overflow-hidden rounded-full bg-slate-200/50 dark:bg-slate-700/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_100%]"
                    initial={{ x: '-100%' }}
                    whileInView={{ x: '0%' }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                      delay: 0.6,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                  />
                </motion.div>
              </div>

              {/* Enhanced tagline */}
              <motion.p
                className="text-xl leading-relaxed text-slate-600 dark:text-slate-400 sm:text-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                Pioneering the future of{' '}
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  construction technology
                </span>{' '}
                through innovative platforms that transform how the industry
                operates.
              </motion.p>

              {/* Subtle decorative element */}
              <motion.div
                className="flex items-center space-x-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500/60"></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-500/40"></div>
                  <div className="h-1 w-1 rounded-full bg-blue-500/30"></div>
                </div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Since 2020
                </span>
              </motion.div>
            </motion.div>

            {/* Right column: Enhanced content with staggered animations */}
            <motion.div
              variants={rightColumnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-8"
            >
              <motion.div
                variants={paragraphVariants}
                className="group relative rounded-2xl border border-slate-200/40 bg-white/60 p-8 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700/40 dark:bg-slate-800/60 dark:shadow-slate-100/5"
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="relative">
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    Ninana Technologies specializes in developing{' '}
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      next-generation platforms
                    </span>{' '}
                    that streamline complex workflows, enhance visual
                    experiences, and accelerate business growth across
                    construction and real estate ecosystems.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={paragraphVariants}
                className="group relative rounded-2xl border border-slate-200/40 bg-white/60 p-8 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700/40 dark:bg-slate-800/60 dark:shadow-slate-100/5"
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="relative">
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    Our flagship ecosystem—
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      Vivid
                    </span>{' '}
                    for immersive architectural visualization,{' '}
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      Pragati
                    </span>{' '}
                    for intelligent project management, and{' '}
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Vesta
                    </span>{' '}
                    for comprehensive real estate operations—empowers
                    professionals to{' '}
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      build the future, today.
                    </span>
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={paragraphVariants}
                className="group relative rounded-2xl border border-slate-200/40 bg-white/60 p-8 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700/40 dark:bg-slate-800/60 dark:shadow-slate-100/5"
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="relative">
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    Driven by a relentless pursuit of innovation and excellence,
                    we&apos;re not just building software—we&apos;re{' '}
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      architecting the infrastructure
                    </span>{' '}
                    that enables smarter construction, faster delivery, and more
                    sustainable growth for the industries that shape our world.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
