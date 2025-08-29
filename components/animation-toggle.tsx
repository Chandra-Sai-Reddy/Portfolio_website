"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'

export function AnimationToggle() {
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check user preference from localStorage
    const savedPreference = localStorage.getItem('animations-enabled')
    if (savedPreference !== null) {
      const enabled = savedPreference === 'true'
      setAnimationsEnabled(enabled)
      updateAnimations(enabled)
    }
    
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches && savedPreference === null) {
      setAnimationsEnabled(false)
      updateAnimations(false)
    }
  }, [])

  const updateAnimations = (enabled: boolean) => {
    if (enabled) {
      document.documentElement.classList.remove('reduce-motion')
    } else {
      document.documentElement.classList.add('reduce-motion')
    }
  }

  const toggleAnimations = () => {
    const newState = !animationsEnabled
    setAnimationsEnabled(newState)
    localStorage.setItem('animations-enabled', String(newState))
    updateAnimations(newState)
  }

  if (!mounted) return null

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      onClick={toggleAnimations}
      className="fixed bottom-4 right-4 z-40 p-3 rounded-lg glass-card border border-border/50 hover:border-primary/50 transition-all duration-200 group"
      aria-label={animationsEnabled ? 'Disable animations' : 'Enable animations'}
      title={animationsEnabled ? 'Disable animations' : 'Enable animations'}
    >
      {animationsEnabled ? (
        <Sparkles className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
      ) : (
        <div className="relative">
          <Sparkles className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <X className="h-3 w-3 absolute -top-1 -right-1 text-red-500" />
        </div>
      )}
    </motion.button>
  )
}
