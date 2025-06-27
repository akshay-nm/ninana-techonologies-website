'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="relative bg-slate-100 py-24">
      {/* Subtle separator */}
      <div className="absolute top-0 left-1/2 h-px w-24 -translate-x-1/2 transform bg-gradient-to-r from-transparent via-gray-400/30 to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          {/* Title and intro */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Get in Touch
            </h2>
            <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <p className="text-lg leading-relaxed text-gray-600">
              Ready to transform your business with our innovative solutions?
              We&apos;d love to hear from you.
            </p>
          </motion.div>

          {/* Contact options */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            <div className="mx-auto grid max-w-lg grid-cols-1 gap-8 md:grid-cols-2">
              {/* Phone */}
              <div className="flex flex-col items-center space-y-3 rounded-lg border border-slate-200/50 bg-white/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-300 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="mb-1 text-sm text-gray-600">Call us</p>
                  <a
                    href="tel:+918447981252"
                    className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600"
                  >
                    +91 844 798 1252
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col items-center space-y-3 rounded-lg border border-slate-200/50 bg-white/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-300 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="mb-1 text-sm text-gray-600">Email us</p>
                  <a
                    href="mailto:contact@ninana.in"
                    className="text-lg font-medium text-gray-900 transition-colors hover:text-purple-600"
                  >
                    contact@ninana.in
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
