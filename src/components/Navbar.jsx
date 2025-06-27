'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { Container } from '@/components/Container'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProductsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close dropdown when pressing Escape
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsProductsOpen(false)
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const products = [
    { name: 'Vivid', href: 'https://vivid.ninana.in' },
    { name: 'Vision', href: 'https://vision.ninana.in' },
    { name: 'Vesta', href: 'https://vesta.ninana.in' },
  ]

  return (
    <nav className="supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 w-full border-b border-gray-200/60 bg-white/95 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center">
            <Logo className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {/* Products Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center space-x-1 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <span>Products</span>
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isProductsOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isProductsOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200/60 bg-white/95 p-2 shadow-2xl backdrop-blur-lg">
                  {products.map((product) => (
                    <a
                      key={product.name}
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full cursor-pointer items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span>{product.name}</span>
                        <svg
                          className="h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </a>
                  ))}

                  {/* Decorative footer */}
                  <div className="mt-2 border-t border-gray-200/60 pt-2">
                    <div className="px-4 py-2 text-center text-xs text-gray-500">
                      Click to explore our products
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* About Link */}
            <a
              href="#about"
              className="cursor-pointer text-gray-700 transition-colors hover:text-gray-900"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('about')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
            >
              About
            </a>

            {/* Contact Us Link */}
            <a
              href="mailto:contact@ninana.in"
              className="cursor-pointer text-gray-700 transition-colors hover:text-gray-900"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 text-gray-700 transition-colors hover:text-gray-900 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200/60 bg-white/95 backdrop-blur md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {/* Mobile Products Section */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-sm font-medium text-gray-700">
                  Products
                </div>
                {products.map((product) => (
                  <a
                    key={product.name}
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-md px-6 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {product.name}
                  </a>
                ))}
              </div>

              {/* Mobile About Link */}
              <a
                href="#about"
                className="block cursor-pointer rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                onClick={(e) => {
                  e.preventDefault()
                  setIsMobileMenuOpen(false)
                  document.getElementById('about')?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }}
              >
                About
              </a>

              {/* Mobile Contact Us Link */}
              <a
                href="mailto:contact@ninana.in"
                className="block cursor-pointer rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </Container>
    </nav>
  )
}
