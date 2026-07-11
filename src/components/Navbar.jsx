'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'

const PRODUCTS = [
  {
    name: 'Vivid',
    href: 'https://vivid.ninana.in',
    description: 'Architectural visualization',
    accent: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    name: 'Pragati',
    href: 'https://pragati.ninana.in/',
    description: 'Construction management',
    accent: 'text-orange-600 dark:text-orange-400',
  },
  {
    name: 'Wasp',
    href: 'https://wasp.ninana.in/',
    description: 'Legal practice platform',
    accent: 'text-amber-600 dark:text-amber-400',
  },
]

const LINKS = [
  { name: 'About', id: 'about' },
  { name: 'Contact', id: 'contact' },
]

function ThemeToggle({ className = '' }) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={`rounded-lg p-2 text-slate-600 transition hover:bg-slate-900/5 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white dark:focus:ring-white/10 ${className}`}
      aria-label="Toggle theme"
    >
      {mounted && resolvedTheme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  )
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-slate-900/10 bg-white/80 backdrop-blur-xl dark:border-white/5 dark:bg-ink/80'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Logo className="h-28 w-28 transition-transform duration-300 hover:scale-105 dark:invert" />
            </Link>

            {/* Desktop navigation */}
            <div className="hidden items-center gap-1 md:flex">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="group flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-900/5 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white dark:focus:ring-white/10">
                    <span>Products</span>
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  sideOffset={8}
                  className="w-72 rounded-2xl border border-slate-900/10 bg-white/95 p-1 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-ink-soft/95 dark:shadow-black/50"
                >
                  {PRODUCTS.map((product) => (
                    <DropdownMenuItem key={product.name} asChild>
                      <a
                        href={product.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex w-full cursor-pointer items-center justify-between rounded-xl p-4 transition hover:bg-slate-900/5 focus:bg-slate-900/5 dark:hover:bg-white/5 dark:focus:bg-white/5"
                      >
                        <div className="flex flex-col">
                          <span className={`font-medium ${product.accent}`}>
                            {product.name}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {product.description}
                          </span>
                        </div>
                        <svg
                          className="h-4 w-4 text-slate-500 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7m0 0H8m9 0v9" />
                        </svg>
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-900/5 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white dark:focus:ring-white/10"
                >
                  {link.name}
                </button>
              ))}

              <ThemeToggle className="ml-1" />

              <a
                href="mailto:contact@ninana.in"
                className="ml-3 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white/10 dark:hover:bg-white/20"
              >
                Work with us
              </a>
            </div>

            {/* Mobile: theme toggle + menu button */}
            <div className="flex items-center gap-1 md:hidden">
              <ThemeToggle />
              <button
                className="relative z-20 rounded-lg p-2 text-slate-600 transition hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="flex h-full flex-col border-l border-slate-900/10 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-ink-soft/95">
                <div className="flex h-14 items-center border-b border-slate-900/10 px-6 dark:border-white/10">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Menu</span>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                        Products
                      </div>
                      <div className="space-y-1">
                        {PRODUCTS.map((product) => (
                          <a
                            key={product.name}
                            href={product.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col rounded-xl p-4 transition hover:bg-slate-900/5 dark:hover:bg-white/5"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className={`font-medium ${product.accent}`}>
                              {product.name}
                            </span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              {product.description}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      {LINKS.map((link) => (
                        <button
                          key={link.name}
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                            scrollToSection(link.id)
                          }}
                          className="flex w-full items-center rounded-xl p-4 text-left font-medium text-slate-900 transition hover:bg-slate-900/5 dark:text-white dark:hover:bg-white/5"
                        >
                          {link.name}
                        </button>
                      ))}
                    </div>
                    <a
                      href="mailto:contact@ninana.in"
                      className="block rounded-full bg-cyan-500 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-ink dark:hover:bg-cyan-300"
                    >
                      Work with us
                    </a>
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
