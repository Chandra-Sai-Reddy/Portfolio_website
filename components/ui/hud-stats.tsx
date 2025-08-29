"use client"

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface HUDStatsProps {
  stats: {
    label: string
    value: number
    suffix?: string
    prefix?: string
  }[]
}

export function HUDStats({ stats }: HUDStatsProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative group flex flex-col items-center"
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <div className="relative text-center">
            {/* Value with counter animation */}
            <div className="text-3xl md:text-4xl font-bold mb-2">
              <span className="text-foreground">
                {stat.prefix}
                {inView && (
                  <CountUp end={stat.value} duration={2} />
                )}
                {stat.suffix}
              </span>
            </div>
            
            {/* Label */}
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
              {stat.label}
            </div>
            
            {/* Decorative dots */}
            <div className="flex justify-center gap-1 mt-3">
              <div className="w-1 h-1 bg-blue-500/50 rounded-full" />
              <div className="w-1 h-1 bg-blue-500 rounded-full" />
              <div className="w-1 h-1 bg-blue-500/50 rounded-full" />
            </div>
          </div>
        </motion.div>
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
