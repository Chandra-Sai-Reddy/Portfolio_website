"use client"

import { useEffect, useRef } from 'react'

// OPTION 4: AURORA BOREALIS (NORTHERN LIGHTS) EFFECT
export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class AuroraWave {
      amplitude: number
      frequency: number
      speed: number
      offset: number
      color: { r: number; g: number; b: number }
      opacity: number
      yBase: number

      constructor(index: number) {
        this.amplitude = Math.random() * 100 + 50
        this.frequency = Math.random() * 0.01 + 0.005
        this.speed = Math.random() * 0.02 + 0.01
        this.offset = Math.random() * Math.PI * 2
        this.opacity = Math.random() * 0.3 + 0.1
        this.yBase = canvas.height * 0.3 + index * 50
        
        const colors = [
          { r: 139, g: 92, b: 246 },   // Purple
          { r: 6, g: 182, b: 212 },     // Cyan
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      draw(time: number) {
        const gradient = ctx.createLinearGradient(0, this.yBase - this.amplitude, 0, this.yBase + this.amplitude * 2)
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`)
        gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`)
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        
        for (let x = 0; x <= canvas.width; x += 5) {
          const y = this.yBase + Math.sin(x * this.frequency + time * this.speed + this.offset) * this.amplitude
          
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fill()
        
        // Add shimmer effect
        const shimmerGradient = ctx.createLinearGradient(0, this.yBase - this.amplitude, 0, this.yBase)
        shimmerGradient.addColorStop(0, `rgba(255, 255, 255, 0)`)
        shimmerGradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.opacity * 0.3})`)
        shimmerGradient.addColorStop(1, `rgba(255, 255, 255, 0)`)
        
        ctx.fillStyle = shimmerGradient
        ctx.beginPath()
        
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = this.yBase + Math.sin(x * this.frequency * 2 + time * this.speed * 2 + this.offset) * this.amplitude * 0.5
          
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.lineTo(canvas.width, this.yBase + this.amplitude)
        ctx.lineTo(0, this.yBase + this.amplitude)
        ctx.closePath()
        ctx.fill()
      }
    }

    const waves: AuroraWave[] = []
    for (let i = 0; i < 5; i++) {
      waves.push(new AuroraWave(i))
    }

    let animationFrameId: number
    let time = 0

    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw aurora waves
      waves.forEach(wave => {
        wave.draw(time)
      })
      
      // Add stars
      if (Math.random() < 0.1) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height * 0.5
        const size = Math.random() * 2
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
      
      time += 1
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Recreate waves on resize
      waves.length = 0
      for (let i = 0; i < 5; i++) {
        waves.push(new AuroraWave(i))
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60 dark:opacity-80"
      style={{ background: 'transparent' }}
    />
  )
}