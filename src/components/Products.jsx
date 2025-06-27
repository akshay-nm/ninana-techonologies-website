'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Products() {
  const products = [
    {
      name: 'Vivid',
      description:
        'Architectural visualization with interactive 3D walkthroughs, sample flats, and browser-based tours.',
      image: '/vivid.png',
      link: 'https://vivid.ninana.in',
    },
    {
      name: 'Vision',
      description:
        'Construction project management platform for tracking demands, site progress, finances, and inventory.',
      image: '/vision.png',
      link: 'https://vision.ninana.in',
    },
    {
      name: 'Vesta',
      description:
        'A premium real estate CRM for residential and commercial builders, helping teams manage bookings, finances, and customer relationships.',
      image: '/vesta.png',
      link: 'https://vesta.ninana.in',
    },
  ]

  return (
    <section id="products" className="relative overflow-hidden py-32">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/30 to-purple-50/40"></div>
      <div className="bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.05),transparent_50%)] absolute inset-0"></div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Enhanced Section Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="mb-8 text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Our Products
          </h2>
          <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <p className="mx-auto max-w-3xl text-xl font-light leading-relaxed text-slate-600 md:text-2xl">
            Discover our suite of innovative solutions designed to accelerate
            your success
          </p>
        </motion.div>

        {/* Premium Product Cards */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: 'easeOut',
              }}
            >
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer"
              >
                <div className="group overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
                  <div className="p-6 pb-4">
                    <div className="mb-4 h-40 w-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 shadow-inner">
                      <Image
                        src={product.image}
                        alt={`${product.name} product image`}
                        width={400}
                        height={200}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600 md:text-2xl">
                      {product.name}
                    </h3>
                  </div>
                  <div className="px-6 pt-0 pb-6">
                    <p className="mb-6 text-sm font-light leading-relaxed text-slate-600">
                      {product.description}
                    </p>

                    {/* Visual indicator that card is clickable */}
                    <div className="pointer-events-none inline-flex items-center rounded-xl border-2 border-blue-600 px-8 py-4 font-semibold text-blue-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/25">
                      <span className="mr-3">Learn More</span>
                      <svg
                        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
