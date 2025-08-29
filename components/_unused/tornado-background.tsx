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

    class Particle {
      x: number = 0
      y: number = 0
      z: number = 0
      angle: number = 0
      radius: number = 0
      baseRadius: number = 0
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

        // Start from bottom
        this.y = canvasHeight + 50
        this.x = canvasWidth / 2

        // Create spiral effect
        this.baseRadius = Math.random() * 100 + 50
        this.radius = this.baseRadius

        // Random depth
        this.z = Math.random() * 1000

        // Speed variations
        this.speed = Math.random() * 0.5 + 0.5
        this.rotationSpeed = Math.random() * 0.02 + 0.01
        this.verticalSpeed = Math.random() * 2 + 1

        // Visual properties
        this.size = Math.random() * 3 + 1
        this.opacity = Math.random() * 0.5 + 0.5

        // Color variations (blue to cyan gradient)
        const colors = ['59, 130, 246', '6, 182, 212', '147, 51, 234']
        this.color = colors[Math.floor(Math.random() * colors.length)]

        this.trail = []
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.life++

        // Rotation
        this.angle += this.rotationSpeed * this.speed

        // Vertical movement (upward)
        this.y -= this.verticalSpeed * this.speed

        // Spiral radius changes (gets wider as it goes up)
        this.radius = this.baseRadius * (1 + (canvasHeight - this.y) / canvasHeight)

        // Calculate position
        const perspectiveFactor = 1000 / (1000 + this.z)
        this.x = canvasWidth / 2 + Math.cos(this.angle) * this.radius * perspectiveFactor

        // Store trail
        this.trail.push({ x: this.x, y: this.y })
        if (this.trail.length > 10) {
          this.trail.shift()
        }

        // Reset when reaching top or exceeding life
        if (this.y < -50 || this.life > this.maxLife) {
          this.reset(canvasWidth, canvasHeight)
        }

        // Fade in/out
        if (this.life < 50) {
          this.opacity = (this.life / 50) * 0.5
        } else if (this.life > this.maxLife - 50) {
          this.opacity = ((this.maxLife - this.life) / 50) * 0.5
        }
      }

      draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
        const perspectiveFactor = 1000 / (1000 + this.z)
        const size = this.size * perspectiveFactor

        // Draw trail
        if (this.trail.length > 1) {
          ctx.beginPath()
          ctx.moveTo(this.trail[0].x, this.trail[0].y)

          for (let i = 1; i < this.trail.length; i++) {
            ctx.lineTo(this.trail[i].x, this.trail[i].y)
          }

          const gradient = ctx.createLinearGradient(
            this.trail[0].x, this.trail[0].y,
            this.x, this.y
          )
          gradient.addColorStop(0, `rgba(${this.color}, 0)`)
          gradient.addColorStop(1, `rgba(${this.color}, ${this.opacity * 0.5})`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = size * 0.5
          ctx.stroke()
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2)

        const particleGradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, size
        )
        particleGradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`)
        particleGradient.addColorStop(1, `rgba(${this.color}, 0)`)

        ctx.fillStyle = particleGradient
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    const particleCount = 100

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
    }

    function animate() {
      if (!ctx || !canvas) return
      
      // Create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Sort particles by z-index (draw far ones first)
      particles.sort((a, b) => b.z - a.z)

      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height)
        particle.draw(ctx, canvas.width, canvas.height)
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
