'use client'

import { motion } from 'framer-motion'

export default function NewFooter() {
  return (
    <footer className="relative bg-black/80">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-rb-navy-dark/50 to-transparent"></div>

      {/* Subtle separator */}
      <div className="absolute top-0 left-1/2 h-px w-20 -translate-x-1/2 transform bg-gradient-to-r from-transparent via-gray-800/30 to-transparent"></div>

      <div className="container relative z-10 mx-auto px-4 py-10">
        <div className="mx-auto max-w-6xl">
          {/* Two-column layout on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
            {/* Left column: Copyright */}
            <motion.div
              className="space-y-3 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              <h3 className="mb-2 text-base font-medium text-gray-300">
                Ninana Technologies
              </h3>
              <p className="text-sm font-light text-gray-500">
                © 2025 Ninana Technologies Private Limited. All rights reserved.
              </p>
            </motion.div>

            {/* Right column: Company details */}
            <motion.div
              className="space-y-2 text-center lg:text-right"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-300">
                  Ninana Technologies Private Limited
                </p>
                <p className="text-xs font-light text-gray-500">
                  Plot No. 660/1, Sector No 30,
                  <br />
                  Gandhinagar 382030, Gujarat
                </p>
              </div>

              <div className="pt-1">
                <p className="text-xs font-light text-gray-500">
                  <a
                    href="mailto:contact@ninana.in"
                    className="transition-colors hover:text-gray-300"
                  >
                    contact@ninana.in
                  </a>
                </p>
              </div>

              <div className="pt-1">
                <p className="text-xs font-light text-gray-600">
                  CIN: U72900GJ2019PTC107365
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
