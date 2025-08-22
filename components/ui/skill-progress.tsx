"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

interface SkillProgressProps {
  skill: string
  percentage: number
  category: string
  delay?: number
}

export function SkillProgress({ skill, percentage, category, delay = 0 }: SkillProgressProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setProgress(percentage)
      }, delay * 100)
      return () => clearTimeout(timer)
    }
  }, [inView, percentage, delay])
  
  // Use only blue color from your palette with subtle variations
  const getColor = () => {
    return 'rgb(59, 130, 246)' // Your primary blue
  }
  
  // Add subtle opacity variation based on percentage for visual interest
  const getOpacity = () => {
    if (percentage >= 90) return 1
    if (percentage >= 85) return 0.9
    return 0.8
  }
  
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference
  
  return (
    <div ref={ref} className="relative">
      <div className="relative w-32 h-32">
        <svg className="transform -rotate-90 w-32 h-32">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            stroke={getColor()}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeOpacity={getOpacity()}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: inView ? strokeDashoffset : circumference }}
            transition={{ duration: 1.5, ease: "easeOut", delay: delay * 0.1 }}
          />
          {/* Add glow effect */}
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            stroke={getColor()}
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeOpacity={0.2}
            filter="blur(8px)"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: inView ? strokeDashoffset : circumference }}
            transition={{ duration: 1.5, ease: "easeOut", delay: delay * 0.1 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className="text-2xl font-bold text-primary"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5 }}
            transition={{ duration: 0.5, delay: delay * 0.1 + 0.5 }}
          >
            {inView ? progress : 0}%
          </motion.span>
        </div>
      </div>
      <p className="text-center mt-3 text-sm font-medium text-muted-foreground">{skill}</p>
    </div>
  )
}
