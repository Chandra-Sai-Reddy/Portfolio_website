"use client"

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface HUDStatsProps {
  stats: {
    label: string
    value: number
    suffix?: string
  }[]
}

export function HUDStats({ stats }: HUDStatsProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="relative group"
        >
          {/* Hexagonal background */}
          <div className="hex-clip absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          
          {/* Content */}
          <div className="relative p-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Value with counter animation */}
              <div className="text-3xl font-bold text-primary terminal-cursor">
                {inView && (
                  <CountUp end={stat.value} duration={2} />
                )}
                {stat.suffix}
              </div>
              
              {/* Label */}
              <div className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">
                {stat.label}
              </div>
              
              {/* Scanning line on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ y: '-100%' }}
                whileHover={{ y: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
          
          {/* Corner dots */}
          <div className="absolute top-2 left-2 w-1 h-1 bg-primary rounded-full" />
          <div className="absolute top-2 right-2 w-1 h-1 bg-primary rounded-full" />
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-primary rounded-full" />
          <div className="absolute bottom-2 right-2 w-1 h-1 bg-primary rounded-full" />
        </div>
      ))}
    </div>
  )
}

// Counter animation component
function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let start = 0
    const increment = end / (duration * 60)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    
    return () => clearInterval(timer)
  }, [end, duration])
  
  return <>{count}</>
}
