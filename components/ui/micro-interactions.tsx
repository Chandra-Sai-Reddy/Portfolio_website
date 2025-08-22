"use client"

import { motion, useAnimation } from 'framer-motion'
import { ReactNode, useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'

// Magnetic button that follows cursor
interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distanceX = (e.clientX - centerX) * 0.1
    const distanceY = (e.clientY - centerY) * 0.1
    
    setPosition({ x: distanceX, y: distanceY })
  }
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }
  
  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  )
}

// Copy email with feedback
interface CopyEmailProps {
  email: string
  className?: string
}

export function CopyEmail({ email, className = '' }: CopyEmailProps) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="relative inline-block">
      <button
        onClick={handleCopy}
        className={`${className} transition-all duration-200 hover:text-primary relative`}
      >
        {email}
      </button>
      
      {/* Copy feedback */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ 
          opacity: copied ? 1 : 0, 
          y: copied ? -30 : 10,
          scale: copied ? 1 : 0.8
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs whitespace-nowrap pointer-events-none flex items-center gap-1"
      >
        <CheckCircle className="h-3 w-3" />
        Copied!
      </motion.div>
    </div>
  )
}

// Emoji particle explosion
interface EmojiExplosionProps {
  trigger: boolean
  emoji?: string
}

export function EmojiExplosion({ trigger, emoji = '🎉' }: EmojiExplosionProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  
  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 200 - 100,
        y: Math.random() * -200 - 50,
      }))
      setParticles(newParticles)
      
      setTimeout(() => setParticles([]), 1000)
    }
  }, [trigger])
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute left-1/2 top-1/2 text-2xl"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: particle.x, y: particle.y, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  )
}

// Animated counter
interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
}

export function AnimatedCounter({ value, duration = 2, className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  
  useEffect(() => {
    const increment = value / (duration * 60) // 60fps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 1000 / 60)
    
    return () => clearInterval(timer)
  }, [value, duration])
  
  return (
    <motion.span 
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {count}
    </motion.span>
  )
}

// Terminal typing effect
interface TerminalTypingProps {
  text: string
  className?: string
}

export function TerminalTyping({ text, className = '' }: TerminalTypingProps) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)
    
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    
    return () => {
      clearInterval(timer)
      clearInterval(cursorTimer)
    }
  }, [text])
  
  return (
    <div className={`font-mono ${className}`}>
      <span className="text-primary">$ </span>
      <span>{displayText}</span>
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>_</span>
    </div>
  )
}
