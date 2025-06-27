'use client'

import { Phone, Mail, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Contact() {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      {/* Premium Background */}
      <div className="dark:from-slate-950/60 dark:to-slate-950/40 absolute inset-0 bg-gradient-to-br from-slate-50/60 via-white/90 to-slate-50/40 dark:via-slate-900/90"></div>

      {/* Subtle texture overlay */}
      <div className="bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.03),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(147,51,234,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(147,51,234,0.08),transparent_50%)] absolute inset-0"></div>

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="from-blue-400/8 to-cyan-400/8 absolute top-20 left-20 h-48 w-48 rounded-full bg-gradient-to-r blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="from-purple-400/8 to-pink-400/8 absolute bottom-20 right-20 h-64 w-64 rounded-full bg-gradient-to-r blur-3xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            scale: [1, 0.95, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Enhanced header section */}
          <motion.div
            className="mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            {/* Premium gradient heading */}
            <motion.h2
              className="mb-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-4xl font-medium leading-[1.2] tracking-[-0.02em] text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400 sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              Let&apos;s Connect
            </motion.h2>

            {/* Animated gradient underline */}
            <motion.div
              className="mx-auto mb-8 h-1 w-20 overflow-hidden rounded-full bg-slate-200/50 dark:bg-slate-700/50"
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
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_100%]"
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

            {/* Enhanced tagline */}
            <motion.p
              className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-600 dark:text-slate-400 sm:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              Ready to transform your vision into reality?{' '}
              <span className="font-medium text-slate-800 dark:text-slate-200">
                We&apos;d love to hear from you.
              </span>
            </motion.p>
          </motion.div>

          {/* Premium contact cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8"
          >
            {/* Phone Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 },
              }}
            >
              <a
                href="tel:+918447981252"
                className="group block"
                aria-label="Call us at +91 844 798 1252"
              >
                <div className="relative overflow-hidden rounded-3xl border border-slate-200/40 bg-white/60 p-8 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-500 hover:border-blue-300/60 hover:bg-white/80 hover:shadow-xl hover:shadow-slate-900/10 dark:border-slate-700/40 dark:bg-slate-800/60 dark:shadow-slate-100/5 dark:hover:border-blue-600/60 dark:hover:bg-slate-800/80 dark:hover:shadow-slate-100/10">
                  {/* Premium glow effect */}
                  <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-500/20 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"></div>

                  {/* Card gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-400/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                  <div className="relative flex flex-col items-center space-y-6">
                    {/* Enhanced icon */}
                    <motion.div
                      className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25"
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      <Phone className="h-7 w-7 text-white" />
                      <div className="absolute -inset-2 rounded-2xl bg-blue-500/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></div>
                    </motion.div>

                    <div className="text-center">
                      <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                        Call us directly
                      </p>
                      <div className="flex items-center space-x-2 text-xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
                        <span>+91 844 798 1252</span>
                        <ArrowUpRight className="h-5 w-5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>

            {/* Email Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 },
              }}
            >
              <a
                href="mailto:contact@ninana.in"
                className="group block"
                aria-label="Email us at contact@ninana.in"
              >
                <div className="relative overflow-hidden rounded-3xl border border-slate-200/40 bg-white/60 p-8 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-500 hover:border-purple-300/60 hover:bg-white/80 hover:shadow-xl hover:shadow-slate-900/10 dark:border-slate-700/40 dark:bg-slate-800/60 dark:shadow-slate-100/5 dark:hover:border-purple-600/60 dark:hover:bg-slate-800/80 dark:hover:shadow-slate-100/10">
                  {/* Premium glow effect */}
                  <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-400/20 to-purple-500/20 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"></div>

                  {/* Card gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-400/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                  <div className="relative flex flex-col items-center space-y-6">
                    {/* Enhanced icon */}
                    <motion.div
                      className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/25"
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      <Mail className="h-7 w-7 text-white" />
                      <div className="absolute -inset-2 rounded-2xl bg-purple-500/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></div>
                    </motion.div>

                    <div className="text-center">
                      <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                        Send us a message
                      </p>
                      <div className="flex items-center space-x-2 text-xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-purple-600 dark:text-slate-100 dark:group-hover:text-purple-400">
                        <span>contact@ninana.in</span>
                        <ArrowUpRight className="h-5 w-5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* Subtle call-to-action footer */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.8,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Typically respond within{' '}
              <span className="font-medium text-slate-700 dark:text-slate-300">
                24 hours
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
