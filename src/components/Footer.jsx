'use client'

// import Image from 'next/future/image'
// import Link from 'next/link'

// import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import Link from 'next/link'
// import { TextField } from '@/components/Fields'
// import { Logo, Logomark } from '@/components/Logo'
// import { NavLinks } from '@/components/NavLinks'
// import qrCode from '@/images/qr-code.svg'
import { motion } from 'framer-motion'

// function QrCodeBorder(props) {
//   return (
//     <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
//       <path
//         d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
//         strokeWidth="2"
//         strokeLinecap="round"
//       />
//     </svg>
//   )
// }

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Premium Background */}
      <div className="dark:from-slate-950 dark:to-slate-950 absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:via-slate-900"></div>

      {/* Subtle texture overlay */}
      <div className="bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.08),transparent_50%)] absolute inset-0"></div>

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 h-32 w-32 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-400/10 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-400/10 blur-3xl"
          animate={{
            x: [0, -15, 0],
            y: [0, 10, 0],
            scale: [1, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Animated top separator */}
      <div className="relative">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
        <motion.div
          className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            delay: 0.5,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
        />
      </div>

      <Container>
        <div className="relative z-10 py-16 lg:py-20">
          {/* Main content container with glassmorphism */}
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-slate-700/40 bg-slate-800/60 p-8 shadow-2xl backdrop-blur-xl lg:p-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            {/* Subtle glow effect */}
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-30 blur"></div>

            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row">
              {/* Company Information */}
              <motion.div
                className="space-y-6 md:max-w-md"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                {/* Company name with gradient */}
                <div>
                  <h3 className="mb-2 bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-xl font-semibold text-transparent">
                    Ninana Technologies
                  </h3>
                  <div className="text-sm leading-relaxed text-slate-400">
                    Private Limited
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-1 text-sm leading-relaxed text-slate-300">
                  <div>Plot No. 660/1, Sector No 30</div>
                  <div>Gandhinagar 382030, Gujarat</div>
                </div>

                {/* CIN */}
                <div className="text-xs text-slate-500">
                  CIN: U72900GJ2019PTC107365
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                <div className="text-sm font-medium text-slate-400">
                  Get in touch
                </div>

                <div className="space-y-3">
                  {/* Phone link */}
                  <motion.a
                    href="tel:+918447981252"
                    className="group flex items-center space-x-3 rounded-lg p-3 text-slate-300 transition-all duration-300 hover:bg-slate-700/50 hover:text-white"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 transition-colors duration-300 group-hover:bg-blue-500/30">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">
                      +91 844 798 1252
                    </span>
                    <svg
                      className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </motion.a>

                  {/* Email link */}
                  <motion.a
                    href="mailto:contact@ninana.in"
                    className="group flex items-center space-x-3 rounded-lg p-3 text-slate-300 transition-all duration-300 hover:bg-slate-700/50 hover:text-white"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 transition-colors duration-300 group-hover:bg-purple-500/30">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">
                      contact@ninana.in
                    </span>
                    <svg
                      className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Copyright section */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.8,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            <div className="inline-flex items-center space-x-2 rounded-full border border-slate-700/50 bg-slate-800/50 px-6 py-3 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
              <p className="text-sm text-slate-400">
                &copy; {new Date().getFullYear()} Ninana Technologies Private
                Limited.{' '}
                <span className="text-slate-300">All rights reserved.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </footer>
  )
}
