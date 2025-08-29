"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface SkillRadarChartProps {
  skills: {
    name: string
    value: number // 0-100
    category: string
  }[]
}

export function SkillRadarChart({ skills }: SkillRadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  
  useEffect(() => {
    if (!canvasRef.current || !isInView) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    canvas.width = 400
    canvas.height = 400
    
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 150
    const angleStep = (Math.PI * 2) / skills.length
    
    // Animation
    let animationProgress = 0
    const animationDuration = 1500
    const startTime = Date.now()
    
    const draw = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      animationProgress = Math.min(elapsed / animationDuration, 1)
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw grid circles
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 + i * 0.05})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      
      // Draw axes
      skills.forEach((_, index) => {
        const angle = angleStep * index - Math.PI / 2
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)'
        ctx.lineWidth = 1
        ctx.stroke()
      })
      
      // Draw data polygon
      ctx.beginPath()
      skills.forEach((skill, index) => {
        const angle = angleStep * index - Math.PI / 2
        const value = (skill.value / 100) * radius * animationProgress
        const x = centerX + Math.cos(angle) * value
        const y = centerY + Math.sin(angle) * value
        
        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.closePath()
      
      // Fill polygon
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)')
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)')
      ctx.fillStyle = gradient
      ctx.fill()
      
      // Stroke polygon
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)'
      ctx.lineWidth = 2
      ctx.stroke()
      
      // Draw points and labels
      skills.forEach((skill, index) => {
        const angle = angleStep * index - Math.PI / 2
        const value = (skill.value / 100) * radius * animationProgress
        const x = centerX + Math.cos(angle) * value
        const y = centerY + Math.sin(angle) * value
        
        // Draw point
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = skill.name === hoveredSkill ? '#00ffff' : '#3b82f6'
        ctx.fill()
        
        // Draw glow effect for hovered point
        if (skill.name === hoveredSkill) {
          ctx.beginPath()
          ctx.arc(x, y, 8, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(0, 255, 255, 0.3)'
          ctx.fill()
        }
        
        // Draw labels
        const labelX = centerX + Math.cos(angle) * (radius + 30)
        const labelY = centerY + Math.sin(angle) * (radius + 30)
        
        ctx.font = '12px Inter'
        ctx.fillStyle = skill.name === hoveredSkill ? '#00ffff' : '#888'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(skill.name, labelX, labelY)
        
        // Draw value on hover
        if (skill.name === hoveredSkill) {
          ctx.font = 'bold 14px Inter'
          ctx.fillStyle = '#00ffff'
          ctx.fillText(`${skill.value}%`, x, y - 15)
        }
      })
      
      if (animationProgress < 1) {
        requestAnimationFrame(draw)
      }
    }
    
    draw()
  }, [skills, isInView, hoveredSkill])
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Calculate which skill is closest to mouse
    let closestSkill = null
    let closestDistance = Infinity
    
    skills.forEach((skill, index) => {
      const angleStep = (Math.PI * 2) / skills.length
      const angle = angleStep * index - Math.PI / 2
      const value = (skill.value / 100) * 150
      const skillX = centerX + Math.cos(angle) * value
      const skillY = centerY + Math.sin(angle) * value
      
      const distance = Math.sqrt((x - skillX) ** 2 + (y - skillY) ** 2)
      
      if (distance < 30 && distance < closestDistance) {
        closestDistance = distance
        closestSkill = skill.name
      }
    })
    
    setHoveredSkill(closestSkill)
  }
  
  return (
    <div 
      ref={containerRef}
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredSkill(null)}
    >
      <canvas 
        ref={canvasRef}
        className="w-full max-w-md cursor-crosshair"
      />
      
      {/* Legend */}
      <div className="absolute top-4 right-4 space-y-2 text-xs">
        {Array.from(new Set(skills.map(s => s.category))).map(category => (
          <div key={category} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary/50" />
            <span className="text-muted-foreground">{category}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface AnimatedStatsProps {
  stats: {
    label: string
    value: number
    suffix?: string
    prefix?: string
    color?: string
  }[]
}

export function AnimatedStats({ stats }: AnimatedStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0))
  
  useEffect(() => {
    if (!isInView) return
    
    const duration = 2000
    const startTime = Date.now()
    
    const animate = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
      const easedProgress = easeOutQuart(progress)
      
      setAnimatedValues(stats.map(stat => Math.floor(stat.value * easedProgress)))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    animate()
  }, [isInView, stats])
  
  return (
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 }}
          className="relative group"
        >
          {/* Background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg blur-xl group-hover:blur-2xl transition-all" />
          
          <div className="relative p-6 glass-card rounded-lg text-center">
            {/* Animated number */}
            <div className="text-4xl font-bold mb-2">
              <span 
                className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {stat.prefix}
                {animatedValues[index]}
                {stat.suffix}
              </span>
            </div>
            
            {/* Label */}
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              {stat.label}
            </div>
            
            {/* Progress bar */}
            <div className="mt-4 h-1 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${(animatedValues[index] / stat.value) * 100}%` } : {}}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-cyan-500"
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

interface TimelineChartProps {
  events: {
    date: string
    title: string
    description: string
    type: 'work' | 'education' | 'achievement'
  }[]
}

export function TimelineChart({ events }: TimelineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })
  
  const typeColors = {
    work: 'from-blue-500 to-cyan-500',
    education: 'from-purple-500 to-pink-500',
    achievement: 'from-yellow-500 to-orange-500'
  }
  
  return (
    <div ref={containerRef} className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-cyan-500 to-purple-500" />
      
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.1 }}
          className="relative mb-8 pl-16"
        >
          {/* Timeline dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="absolute left-8 top-2 w-4 h-4 -translate-x-1/2"
          >
            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${typeColors[event.type]}`} />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${typeColors[event.type]}`}
            />
          </motion.div>
          
          {/* Content */}
          <div className="glass-card p-4 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs text-muted-foreground">{event.date}</span>
              <span className={`px-2 py-1 text-xs rounded-full bg-gradient-to-r ${typeColors[event.type]} bg-opacity-20`}>
                {event.type}
              </span>
            </div>
            <h4 className="font-semibold mb-1">{event.title}</h4>
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
