"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import Image from 'next/image'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  
  // Scroll progress
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/experience', label: 'Experience' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ]
  
  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-[60] origin-left"
        style={{ scaleX }}
      >
        <div className="h-full bg-blue-500" />
      </motion.div>
      
      <nav
        className={`fixed z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-ultra shadow-2xl depth-shadow backdrop-blur-xl'
            : 'glass-ultra shadow-xl backdrop-blur-md'
        } md:top-6 md:left-1/2 md:-translate-x-1/2 md:rounded-lg md:px-6 md:py-3 md:border md:border-border/50
        top-0 left-0 right-0 px-4 py-3 rounded-b-lg border-b border-x border-border/50 w-full md:w-auto`}
      >
        <div className="flex items-center justify-between gap-4 md:justify-center md:gap-8">
          {/* Mobile Brand Logo */}
          <div className="md:hidden">
            <Link href="/" className="flex items-center">
              <Image
                src="/s.png"
                alt="Chandra Sai Reddy - DCS"
                width={100}
                height={100}
                className="h-16 w-auto object-contain "
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation + Theme Toggle Container */}
          <div className="hidden md:flex items-center gap-6">
            {/* Desktop Logo */}
            <Link href="/" className="flex items-center mr-4">
              <Image
                src="/s.png"
                alt="Chandra Sai Reddy - DCS"
                width={100}
                height={100}
                className="h-16 w-auto object-contain "
                priority
              />
            </Link>
            
            {/* Navigation Items */}
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-all duration-200 group ${
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {/* Animated underline */}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: pathname === item.href ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ originX: 0 }}
                />
                {/* Hover glow effect */}
                <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/5 blur-xl" />
              </Link>
            ))}

            {/* Theme Toggle - Now inside desktop container */}
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors relative"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              {mounted && (
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.button>
          </div>

          {/* Mobile Theme Toggle - Separate for mobile */}
          <motion.button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors relative"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            {mounted && (
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-lg hover:bg-white/10 transition-colors touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden mt-4 pt-4 border-t border-border/50"
            >
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-medium transition-all duration-200 px-4 py-3 rounded-lg touch-manipulation min-h-[48px] flex items-center ${
                      pathname === item.href
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                    )}
                  </Link>
                ))}
                
                {/* Mobile Contact CTA */}
                <div className="pt-4 border-t border-white/10 mt-4">
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-6 py-4 bg-blue-500 text-white rounded-lg font-semibold text-center touch-manipulation min-h-[48px] flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
                  >
                    <span>Get In Touch</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
