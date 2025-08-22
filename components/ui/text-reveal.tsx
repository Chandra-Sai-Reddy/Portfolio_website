"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

interface TextRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  blur?: boolean
}

export function TextReveal({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.8,
  blur = true 
}: TextRevealProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ 
          y: 40,
          opacity: 0,
          filter: blur ? 'blur(10px)' : 'blur(0px)'
        }}
        animate={inView ? {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)'
        } : {}}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Staggered text reveal for multiple lines
interface StaggeredTextRevealProps {
  text: string[]
  className?: string
  delay?: number
}

export function StaggeredTextReveal({ 
  text, 
  className = '',
  delay = 0 
}: StaggeredTextRevealProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      }
    }
  }
  
  const item = {
    hidden: { 
      y: 30,
      opacity: 0,
      filter: 'blur(10px)'
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      }
    }
  }
  
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {text.map((line, index) => (
        <motion.div key={index} variants={item} className="overflow-hidden">
          {line}
        </motion.div>
      ))}
    </motion.div>
  )
}
