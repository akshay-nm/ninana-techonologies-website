'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Logo, Logomark } from '@/components/Logo'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track scroll for enhanced backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const products = [
    {
      name: 'Vivid',
      href: 'https://vivid.ninana.in',
      description: 'Architectural visualization',
    },
    {
      name: 'Vision',
      href: 'https://vision.ninana.in',
      description: 'Project management',
    },
    {
      name: 'Vesta',
      href: 'https://vesta.ninana.in',
      description: 'Real estate CRM',
    },
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-slate-200/50 bg-white/80 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/80'
            : 'bg-white/60 backdrop-blur-sm dark:bg-slate-900/60'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {/* Floating background element for subtle depth */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 h-32 w-32 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl"
            animate={{
              x: [0, 20, 0],
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            {/* Enhanced Brand */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/" className="group flex items-center">
                <Logo className="h-28 w-28 transition-all duration-300 group-hover:scale-105" />
              </Link>
            </motion.div>

            {/* Premium Desktop Navigation */}
            <div className="hidden items-center space-x-1 md:flex">
              {/* Enhanced Products Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    className="group flex items-center space-x-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100/80 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white dark:focus:ring-slate-600"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="tracking-tight">Products</span>
                    <ChevronDown className="group-data-[state=open]:rotate-180 h-3.5 w-3.5 transition-transform duration-300" />
                  </motion.button>
                </DropdownMenuTrigger>

                <AnimatePresence>
                  <DropdownMenuContent
                    align="center"
                    sideOffset={8}
                    className="w-72 overflow-hidden rounded-2xl border border-slate-200/60 bg-white/95 p-1 shadow-2xl backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-800/95"
                    asChild
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{
                        duration: 0.2,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                    >
                      <div className="space-y-1">
                        {products.map((product, index) => (
                          <DropdownMenuItem key={product.name} asChild>
                            <motion.a
                              href={product.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex w-full cursor-pointer items-center justify-between rounded-xl p-4 text-slate-700 transition-all duration-200 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-700/50 dark:hover:text-white"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.05,
                                duration: 0.2,
                              }}
                              whileHover={{ x: 4 }}
                            >
                              <div className="flex flex-col">
                                <span className="font-medium tracking-tight">
                                  {product.name}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {product.description}
                                </span>
                              </div>
                              <svg
                                className="h-4 w-4 text-slate-400 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </motion.a>
                          </DropdownMenuItem>
                        ))}
                      </div>

                      {/* Enhanced footer */}
                      <div className="mx-2 mt-2 border-t border-slate-200/60 pt-2 dark:border-slate-600/60">
                        <div className="px-2 py-2 text-center text-xs text-slate-500 dark:text-slate-400">
                          Explore our products
                        </div>
                      </div>
                    </motion.div>
                  </DropdownMenuContent>
                </AnimatePresence>
              </DropdownMenu>

              {/* Enhanced Navigation Links */}
              {[
                { name: 'About', id: 'about' },
                { name: 'Contact', id: 'contact' },
              ].map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="rounded-lg px-3 py-2 text-sm font-medium tracking-tight text-slate-700 transition-all duration-200 hover:bg-slate-100/80 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white dark:focus:ring-slate-600"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              className="relative z-20 rounded-lg p-2 text-slate-700 transition-all duration-200 hover:bg-slate-100/80 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white dark:focus:ring-slate-600 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Premium Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="h-full border-l border-slate-200/50 bg-white/95 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/95">
                <div className="flex h-full flex-col">
                  {/* Mobile Header */}
                  <div className="flex h-14 items-center justify-between border-b border-slate-200/50 px-6 dark:border-slate-700/50">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      Menu
                    </span>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                      {/* Mobile Products Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-3"
                      >
                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Products
                        </div>
                        <div className="space-y-1">
                          {products.map((product, index) => (
                            <motion.a
                              key={product.name}
                              href={product.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-between rounded-xl p-4 transition-all duration-200 hover:bg-slate-100/80 dark:hover:bg-slate-700/50"
                              onClick={() => setIsMobileMenuOpen(false)}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 + index * 0.05 }}
                              whileHover={{ x: 4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex flex-col">
                                <span className="font-medium text-slate-900 dark:text-white">
                                  {product.name}
                                </span>
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                  {product.description}
                                </span>
                              </div>
                              <svg
                                className="h-4 w-4 text-slate-400 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>

                      {/* Mobile Navigation Links */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-1"
                      >
                        {[
                          { name: 'About', id: 'about' },
                          { name: 'Contact', id: 'contact' },
                        ].map((link, index) => (
                          <motion.button
                            key={link.name}
                            onClick={() => {
                              setIsMobileMenuOpen(false)
                              scrollToSection(link.id)
                            }}
                            className="flex w-full items-center rounded-xl p-4 text-left text-slate-900 transition-all duration-200 hover:bg-slate-100/80 dark:text-white dark:hover:bg-slate-700/50"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35 + index * 0.05 }}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="font-medium">{link.name}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
