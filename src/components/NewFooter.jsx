'use client'

import { motion } from 'framer-motion'

export default function NewFooter() {
  return (
    <footer className="relative mt-16">
      {/* Subtle separator */}
      <div className="absolute top-0 left-1/2 h-px w-24 -translate-x-1/2 transform bg-gradient-to-r from-transparent via-gray-400/30 to-transparent"></div>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Two-column layout on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left column: Copyright */}
            <motion.div
              className="space-y-4 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Ninana Technologies
              </h3>
              <p className="leading-relaxed text-gray-600">
                © 2025 Ninana Technologies Private Limited. All rights reserved.
              </p>
            </motion.div>

            {/* Right column: Company details */}
            <motion.div
              className="space-y-3 text-center lg:text-right"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              <div className="space-y-2">
                <p className="font-medium text-gray-900">
                  Ninana Technologies Private Limited
                </p>
                <p className="text-sm leading-relaxed text-gray-600">
                  Plot No. 660/1, Sector No 30,
                  <br />
                  Gandhinagar 382030, Gujarat
                </p>
              </div>

              <div className="space-y-1 pt-2">
                <p className="text-sm text-gray-600">
                  <a
                    href="mailto:contact@ninana.in"
                    className="transition-colors hover:text-gray-900"
                  >
                    contact@ninana.in
                  </a>
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500">
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
