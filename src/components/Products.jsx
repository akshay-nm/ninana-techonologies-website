'use client'

import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { motion } from 'framer-motion'

export default function Products() {
  const products = [
    {
      name: 'Vivid',
      description:
        'Architectural visualization with interactive 3D walkthroughs, sample flats, and browser-based tours.',
      image: '/vivid.png',
      link: 'https://vivid.ninana.in',
      gradient: 'from-blue-500/10 to-cyan-400/10',
      accent: 'blue',
    },
    {
      name: 'Vision',
      description:
        'Construction project management platform for tracking demands, site progress, finances, and inventory.',
      image: '/vision.png',
      link: 'https://vision.ninana.in',
      gradient: 'from-purple-500/10 to-pink-400/10',
      accent: 'purple',
    },
    {
      name: 'Vesta',
      description:
        'A premium real estate CRM for residential and commercial builders, helping teams manage finances and customer relationships.',
      image: '/vesta.png',
      link: 'https://vesta.ninana.in',
      gradient: 'from-emerald-500/10 to-teal-400/10',
      accent: 'emerald',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
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

  return (
    <section id="products" className="relative py-24 lg:py-32">
      {/* Premium Background with subtle texture */}
      <div className="dark:from-slate-950/80 dark:to-slate-950/60 absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white to-slate-50/60 dark:via-slate-900"></div>

      {/* Subtle background texture */}
      <div className="bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.03),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.08),transparent_50%)] absolute inset-0"></div>

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 h-72 w-72 rounded-full bg-gradient-to-r from-blue-400/5 to-purple-400/5 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-gradient-to-r from-purple-400/5 to-pink-400/5 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Enhanced Section Header */}
        <motion.div
          className="mb-16 text-center lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <motion.h2
            className="mb-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-4xl font-medium leading-[1.2] tracking-[-0.02em] text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400 sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            Our Products
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            Discover our suite of{' '}
            <span className="font-medium text-slate-800 dark:text-slate-200">
              innovative solutions
            </span>{' '}
            designed to accelerate your success
          </motion.p>
        </motion.div>

        {/* Premium Product Cards */}
        <motion.div
          className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] },
              }}
            >
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block cursor-pointer"
              >
                <Card className="relative h-full overflow-hidden rounded-3xl border border-slate-200/40 bg-white/60 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-500 hover:border-slate-300/60 hover:bg-white/80 hover:shadow-xl hover:shadow-slate-900/10 dark:border-slate-700/40 dark:bg-slate-800/60 dark:shadow-slate-100/5 dark:hover:border-slate-600/60 dark:hover:bg-slate-800/80 dark:hover:shadow-slate-100/10">
                  {/* Premium glow effect */}
                  <div
                    className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${product.gradient} opacity-0 blur transition-opacity duration-500 group-hover:opacity-100`}
                  ></div>

                  {/* Card gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  ></div>

                  <CardHeader className="relative p-6 pb-4">
                    <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100/80 to-slate-200/80 shadow-inner dark:from-slate-700/80 dark:to-slate-600/80">
                      <div className="aspect-[4/3] w-full">
                        <Image
                          src={product.image}
                          alt={`${product.name} product interface`}
                          width={400}
                          height={300}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <CardTitle
                      className={`mb-3 text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-slate-100 ${
                        product.accent === 'blue'
                          ? 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
                          : product.accent === 'purple'
                          ? 'group-hover:text-purple-600 dark:group-hover:text-purple-400'
                          : 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                      }`}
                    >
                      {product.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative flex flex-1 flex-col justify-between p-6 pt-0">
                    <CardDescription className="mb-6 flex-1 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                      {product.description}
                    </CardDescription>

                    {/* Premium Learn More button */}
                    <div className="mt-auto">
                      <div
                        className={`group/btn inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition-all duration-300 ${
                          product.accent === 'blue'
                            ? 'border-blue-200/60 bg-blue-50/80 text-blue-700 hover:border-blue-300/80 hover:bg-blue-100/80 hover:text-blue-800 dark:border-blue-700/60 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:border-blue-600/80 dark:hover:bg-blue-900/40'
                            : product.accent === 'purple'
                            ? 'border-purple-200/60 bg-purple-50/80 text-purple-700 hover:border-purple-300/80 hover:bg-purple-100/80 hover:text-purple-800 dark:border-purple-700/60 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:border-purple-600/80 dark:hover:bg-purple-900/40'
                            : 'border-emerald-200/60 bg-emerald-50/80 text-emerald-700 hover:border-emerald-300/80 hover:bg-emerald-100/80 hover:text-emerald-800 dark:border-emerald-700/60 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:border-emerald-600/80 dark:hover:bg-emerald-900/40'
                        }`}
                      >
                        <span className="mr-2">Learn More</span>
                        <svg
                          className="group-hover/btn:translate-x-1 h-4 w-4 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
