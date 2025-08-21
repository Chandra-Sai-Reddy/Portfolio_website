"use client"

import { useEffect, useRef } from 'react'

export function TornadoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Particle class for advanced tornado effect
    class Particle {
      x: number
      y: number
      z: number
      angle: number
      radius: number
      baseRadius: number
      speed: number
      rotationSpeed: number
      verticalSpeed: number
      size: number
      opacity: number
      color: string
      trail: { x: number; y: number; opacity: number }[]
      life: number
      maxLife: number

      constructor() {
        this.reset()
        // Start particles at random positions in their lifecycle
        this.angle = Math.random() * Math.PI * 2
        this.y = Math.random() * canvas.height
        this.life = Math.random() * this.maxLife
      }

      reset() {
        const centerX = canvas.width / 2
        const centerY = canvas.height

        // Initialize particle properties
        this.angle = 0
        this.baseRadius = Math.random() * 200 + 50
        this.radius = this.baseRadius
        this.y = canvas.height
        this.z = Math.random() * 1000
        this.speed = Math.random() * 0.02 + 0.005
        this.rotationSpeed = Math.random() * 0.03 + 0.01
        this.verticalSpeed = Math.random() * 3 + 1
        this.size = Math.random() * 3 + 1
        this.opacity = 0
        this.trail = []
        this.life = 0
        this.maxLife = 200

        // Color palette - electric purple, cyan, magenta with variations
        const colors = [
          '139, 92, 246',   // Electric Purple
          '6, 182, 212',    // Cyan
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        const centerX = canvas.width / 2
        const centerY = canvas.height

        // Update life cycle
        this.life++
        
        // Fade in and out based on life cycle
        if (this.life < 20) {
          this.opacity = (this.life / 20) * 0.8
        } else if (this.life > this.maxLife - 20) {
          this.opacity = ((this.maxLife - this.life) / 20) * 0.8
        } else {
          this.opacity = 0.8
        }

        // Spiral motion
        this.angle += this.rotationSpeed
        
        // Tornado shape - radius decreases as particle moves up
        const heightFactor = 1 - (canvas.height - this.y) / canvas.height
        this.radius = this.baseRadius * (1 - heightFactor * 0.8)
        
        // Add turbulence
        const turbulence = Math.sin(this.angle * 3) * 10
        
        // Calculate 3D position
        const perspective = 1000 / (1000 + this.z)
        this.x = centerX + (Math.cos(this.angle) * (this.radius + turbulence)) * perspective
        const displayY = this.y - (canvas.height - centerY) * (1 - perspective)
        
        // Vertical movement with acceleration
        this.verticalSpeed += 0.05
        this.y -= this.verticalSpeed
        
        // Add to trail for motion blur effect
        this.trail.push({
          x: this.x,
          y: displayY,
          opacity: this.opacity * 0.5
        })
        
        // Limit trail length
        if (this.trail.length > 10) {
          this.trail.shift()
        }
        
        // Reset when particle reaches top or exceeds life
        if (this.y < -50 || this.life > this.maxLife) {
          this.reset()
        }
      }

      draw() {
        // Draw motion blur trail
        ctx.strokeStyle = `rgba(${this.color}, ${this.opacity * 0.3})`
        ctx.lineWidth = this.size * 0.5
        ctx.beginPath()
        
        for (let i = 0; i < this.trail.length - 1; i++) {
          const point = this.trail[i]
          const nextPoint = this.trail[i + 1]
          
          if (i === 0) {
            ctx.moveTo(point.x, point.y)
          }
          
          // Create smooth curve between points
          const midX = (point.x + nextPoint.x) / 2
          const midY = (point.y + nextPoint.y) / 2
          ctx.quadraticCurveTo(point.x, point.y, midX, midY)
        }
        ctx.stroke()
        
        // Draw main particle with glow effect
        const displayY = this.y - (canvas.height - canvas.height) * (1 - (1000 / (1000 + this.z)))
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          this.x, displayY, 0,
          this.x, displayY, this.size * 4
        )
        gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`)
        gradient.addColorStop(0.5, `rgba(${this.color}, ${this.opacity * 0.5})`)
        gradient.addColorStop(1, `rgba(${this.color}, 0)`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, displayY, this.size * 4, 0, Math.PI * 2)
        ctx.fill()
        
        // Inner bright core
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`
        ctx.beginPath()
        ctx.arc(this.x, displayY, this.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particleCount = 120
    const particles: Particle[] = []
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      // Create fade effect with dark background
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Sort particles by z-depth for proper layering
      particles.sort((a, b) => b.z - a.z)
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      // Add center vortex glow
      const centerX = canvas.width / 2
      const centerY = canvas.height
      const vortexGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 300
      )
      vortexGradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)')
      vortexGradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.05)')
      vortexGradient.addColorStop(1, 'rgba(236, 72, 153, 0)')
      
      ctx.fillStyle = vortexGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, 300, 0, Math.PI * 2)
      ctx.fill()
      
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
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
      className="fixed inset-0 z-0 pointer-events-none opacity-50 dark:opacity-70"
      style={{
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  )
}