'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="relative py-24">
      {/* Subtle separator */}
      <div className="via-muted-foreground/30 absolute top-0 left-1/2 h-px w-24 -translate-x-1/2 transform bg-gradient-to-r from-transparent to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Two-column layout on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left column: Heading and intro */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
                About Ninana
              </h2>
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <p className="text-muted-foreground text-xl leading-relaxed">
                A forward-thinking product company revolutionizing construction
                and real estate through innovative technology.
              </p>
            </motion.div>

            {/* Right column: Full description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Ninana Technologies specializes in developing platforms that
                  streamline workflows, enhance visualization, and drive
                  business growth across the construction and real estate
                  sectors.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Our flagship products—
                  <span className="text-foreground font-medium">Vivid</span> for
                  architectural visualization,{' '}
                  <span className="text-foreground font-medium">Vision</span>{' '}
                  for construction project management, and{' '}
                  <span className="text-foreground font-medium">Vesta</span> for
                  real estate CRM and payments—are designed to empower
                  professionals and transform how the industry operates.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  With a commitment to excellence and innovation, we continue to
                  push the boundaries of what&apos;s possible in construction
                  technology, helping businesses build smarter, faster, and more
                  efficiently.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
