"use client"

import { motion } from 'framer-motion'
import { ReactNode, useState, useEffect } from 'react'
import { Check, Copy } from 'lucide-react'

interface AnimatedCounterProps {
  value: string
  inView: boolean
  className?: string
}

export function AnimatedCounter({ value, inView, className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!inView) return
    
    // Extract numeric value from string (handles percentages, numbers with +, etc.)
    const numericValue = parseFloat(value.replace(/[^\d.]/g, ''))
    
    if (isNaN(numericValue)) {
      setCount(0)
      return
    }

    const duration = 2000 // 2 seconds
    const steps = 60 // 60fps
    const increment = numericValue / steps
    
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [inView, value])

  // Format the display value (preserve original formatting)
  const formatValue = (num: number) => {
    if (value.includes('%')) return `${num}%`
    if (value.includes('+')) return `${num}+`
    return num.toString()
  }

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      className={className}
    >
      {formatValue(count)}
    </motion.span>
  )
}

interface MagneticButtonProps {
  children: ReactNode
  className?: string
}

export function MagneticButton({ children, className = '' }: MagneticButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ScrollIndicatorProps {
  className?: string
}

export function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className={`flex flex-col items-center gap-2 ${className}`}
    >
      <span className="text-xs text-muted-foreground">Scroll</span>
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1 h-2 bg-primary rounded-full mt-1"
        />
      </motion.div>
    </motion.div>
  )
}

interface GlowCardProps {
  children: ReactNode
  className?: string
}

export function GlowCard({ children, className = '' }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ 
        boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
        borderColor: 'rgba(59, 130, 246, 0.5)'
      }}
      transition={{ duration: 0.3 }}
      className={`relative p-6 rounded-lg border border-border bg-card/50 backdrop-blur ${className}`}
    >
      {children}
    </motion.div>
  )
}

interface CopyEmailProps {
  email: string
  className?: string
}

export function CopyEmail({ email, className = '' }: CopyEmailProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors ${className}`}
      data-cursor-text="Copy"
    >
      <span className="font-mono">{email}</span>
      <motion.div
        initial={false}
        animate={{ scale: copied ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.2 }}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </motion.div>
    </button>
  )
}
