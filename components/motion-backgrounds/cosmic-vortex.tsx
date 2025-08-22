"use client"

import { useEffect, useRef } from 'react'

export function CosmicVortexBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class VortexStar {
      x: number = 0
      y: number = 0
      radius: number = 0
      baseRadius: number = 0
      angle: number = 0
      speed: number = 0
      rotationSpeed: number = 0
      verticalSpeed: number = 0
      size: number = 0
      opacity: number = 0
      color: string = ''
      trail: { x: number; y: number }[] = []
      life: number = 0
      maxLife: number = 0

      constructor(canvasWidth: number, canvasHeight: number) {
        this.reset(canvasWidth, canvasHeight)
      }

      reset(canvasWidth: number, canvasHeight: number) {
        this.angle = Math.random() * Math.PI * 2
        this.life = 0
        this.maxLife = Math.random() * 500 + 500

        // Start from center of vortex
        this.x = canvasWidth / 2
        this.y = canvasHeight / 2

        // Create spiral effect from center outward
        this.baseRadius = 0
        this.radius = 0

        // Speed variations
        this.speed = Math.random() * 0.5 + 0.5
        this.rotationSpeed = Math.random() * 0.02 + 0.01
        this.verticalSpeed = 0 // No vertical movement for vortex

        // Visual properties
        this.size = Math.random() * 2 + 0.5
        this.opacity = 0

        // Color variations
        const colors = ['147, 51, 234', '168, 85, 247', '196, 181, 253']
        this.color = colors[Math.floor(Math.random() * colors.length)]

        this.trail = []
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.life++

        // Rotation
        this.angle += this.rotationSpeed * this.speed

        // Spiral outward
        this.radius += this.speed * 2

        // Calculate position
        this.x = canvasWidth / 2 + Math.cos(this.angle) * this.radius
        this.y = canvasHeight / 2 + Math.sin(this.angle) * this.radius

        // Store trail
        this.trail.push({ x: this.x, y: this.y })
        if (this.trail.length > 20) {
          this.trail.shift()
        }

        // Reset when reaching edge
        const maxRadius = Math.max(canvasWidth, canvasHeight) / 2
        if (this.radius > maxRadius || this.life > this.maxLife) {
          this.reset(canvasWidth, canvasHeight)
        }

        // Fade in/out
        if (this.life < 50) {
          this.opacity = (this.life / 50) * 0.8
        } else if (this.radius > maxRadius * 0.8) {
          this.opacity = ((maxRadius - this.radius) / (maxRadius * 0.2)) * 0.8
        } else {
          this.opacity = 0.8
        }

        // Size based on distance from center
        this.size = (this.radius / maxRadius) * 3 + 0.5
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw trail
        if (this.trail.length > 1) {
          ctx.beginPath()
          ctx.moveTo(this.trail[0].x, this.trail[0].y)

          for (let i = 1; i < this.trail.length; i++) {
            const progress = i / this.trail.length
            ctx.lineTo(this.trail[i].x, this.trail[i].y)
          }

          const gradient = ctx.createLinearGradient(
            this.trail[0].x, this.trail[0].y,
            this.x, this.y
          )
          gradient.addColorStop(0, `rgba(${this.color}, 0)`)
          gradient.addColorStop(0.5, `rgba(${this.color}, ${this.opacity * 0.3})`)
          gradient.addColorStop(1, `rgba(${this.color}, ${this.opacity * 0.6})`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = this.size * 0.5
          ctx.stroke()
        }

        // Draw star
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`
        ctx.fill()
        ctx.closePath()

        // Add glow effect
        const glowGradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        )
        glowGradient.addColorStop(0, `rgba(${this.color}, ${this.opacity * 0.5})`)
        glowGradient.addColorStop(0.5, `rgba(${this.color}, ${this.opacity * 0.2})`)
        glowGradient.addColorStop(1, `rgba(${this.color}, 0)`)

        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const stars: VortexStar[] = []
    const starCount = 150

    for (let i = 0; i < starCount; i++) {
      const star = new VortexStar(canvas.width, canvas.height)
      // Stagger the initial life to spread out the spiral
      star.life = Math.random() * star.maxLife
      star.radius = (star.life / star.maxLife) * Math.max(canvas.width, canvas.height) / 2
      stars.push(star)
    }

    function animate() {
      if (!ctx || !canvas) return
      
      // Create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach(star => {
        star.update(canvas.width, canvas.height)
        star.draw(ctx)
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
    />
  )
}
