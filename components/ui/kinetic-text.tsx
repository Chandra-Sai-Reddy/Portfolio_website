"use client"

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface KineticTextProps {
  text: string
  className?: string
  delay?: number
  scramble?: boolean
  gradient?: boolean
  glitch?: boolean
}

export function KineticText({ 
  text, 
  className = '', 
  delay = 0, 
  scramble = true,
  gradient = false,
  glitch = false 
}: KineticTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [isScrambling, setIsScrambling] = useState(scramble)
  const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  useEffect(() => {
    if (!scramble) {
      setDisplayText(text)
      return
    }
    
    let iteration = 0
    const maxIterations = text.length * 3
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration / 3) {
              return text[index]
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
          })
          .join('')
      )
      
      iteration++
      
      if (iteration >= maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, 30)
    
    return () => clearInterval(interval)
  }, [text, scramble])
  
  const textClasses = `
    ${className}
    ${gradient ? 'bg-gradient-to-r from-primary via-cyan-500 to-purple-500 bg-clip-text text-transparent' : ''}
    ${glitch ? 'glitch' : ''}
    ${isScrambling ? 'font-mono' : ''}
  `
  
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={textClasses}
      data-text={text}
    >
      {displayText}
    </motion.span>
  )
}

interface TypewriterTextProps {
  texts: string[]
  className?: string
  speed?: number
  deleteSpeed?: number
  pauseDuration?: number
}

export function TypewriterText({ 
  texts, 
  className = '',
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000
}: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  
  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentTextIndex]
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1))
        
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1))
        
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }
    
    const timeout = setTimeout(
      handleTyping,
      isDeleting ? deleteSpeed : speed
    )
    
    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, texts, speed, deleteSpeed, pauseDuration])
  
  return (
    <span className={`${className} font-mono`}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

interface MorphingTextProps {
  texts: string[]
  className?: string
  duration?: number
}

export function MorphingText({ texts, className = '', duration = 3000 }: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, duration)
    
    return () => clearInterval(interval)
  }, [texts.length, duration])
  
  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ 
            opacity: 0,
            filter: 'blur(10px)',
            y: 20
          }}
          animate={{ 
            opacity: 1,
            filter: 'blur(0px)',
            y: 0
          }}
          exit={{ 
            opacity: 0,
            filter: 'blur(10px)',
            y: -20
          }}
          transition={{ duration: 0.5 }}
        >
          {texts[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

interface GlowingTextProps {
  text: string
  className?: string
  color?: string
}

export function GlowingText({ text, className = '', color = 'primary' }: GlowingTextProps) {
  return (
    <motion.span
      className={`${className} relative inline-block`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        className={`absolute inset-0 blur-lg bg-${color} opacity-50`}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.span>
  )
}
