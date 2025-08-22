"use client"

import { useRef, useState, MouseEvent, ReactNode } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface Tilt3DProps {
  children: ReactNode
  className?: string
  max?: number
  scale?: number
  speed?: number
}

export function Tilt3D({ 
  children, 
  className = '', 
  max = 15, 
  scale = 1.05,
  speed = 400 
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  
  const springConfig = { damping: 20, stiffness: speed }
  const springX = useSpring(rotateX, springConfig)
  const springY = useSpring(rotateY, springConfig)
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const centerX = rect.left + width / 2
    const centerY = rect.top + height / 2
    
    const x = e.clientX - centerX
    const y = e.clientY - centerY
    
    const rotateXValue = (y / (height / 2)) * -max
    const rotateYValue = (x / (width / 2)) * max
    
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }
  
  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }
  
  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
        rotateX: springX,
        rotateY: springY,
      }}
      whileHover={{ scale }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        {children}
        {/* Glare effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            background: useTransform(
              [springX, springY],
              ([x, y]: any) => {
                const angle = Math.atan2(y, x) * (180 / Math.PI) - 90
                return `linear-gradient(${angle}deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)`
              }
            ),
          }}
        />
      </div>
    </motion.div>
  )
}
