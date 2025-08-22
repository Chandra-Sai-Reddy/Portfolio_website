"use client"

import { useEffect, useRef } from 'react'

export function MeteorShowerBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Meteor {
      x: number = 0
      y: number = 0
      length: number = 0
      speed: number = 0
      size: number = 0
      angle: number = 0
      opacity: number = 0
      color: string = ''
      trail: { x: number; y: number; opacity: number }[] = []

      constructor(canvasWidth: number, canvasHeight: number) {
        this.reset(canvasWidth, canvasHeight)
      }

      reset(canvasWidth: number, canvasHeight: number) {
        // Start from top or right edge
        if (Math.random() > 0.5) {
          // From top
          this.x = Math.random() * canvasWidth * 1.5 - canvasWidth * 0.25
          this.y = -50
        } else {
          // From right
          this.x = canvasWidth + 50
          this.y = Math.random() * canvasHeight * 0.5
        }

        // Meteor properties
        this.length = Math.random() * 80 + 20
        this.speed = Math.random() * 10 + 5
        this.size = Math.random() * 2 + 0.5
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5 // Roughly 45 degrees
        this.opacity = 1

        // Color variations (blue-white)
        const colors = ['255, 255, 255', '59, 130, 246', '147, 197, 253']
        this.color = colors[Math.floor(Math.random() * colors.length)]

        this.trail = []
      }

      update(canvasWidth: number, canvasHeight: number) {
        // Move meteor
        this.x -= Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed

        // Store trail positions
        this.trail.push({
          x: this.x,
          y: this.y,
          opacity: this.opacity
        })

        // Limit trail length
        if (this.trail.length > this.length / 2) {
          this.trail.shift()
        }

        // Fade trail
        this.trail.forEach((point, index) => {
          point.opacity = (index / this.trail.length) * this.opacity
        })

        // Reset if off screen
        if (this.x < -100 || this.y > canvasHeight + 100) {
          this.reset(canvasWidth, canvasHeight)
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw trail
        if (this.trail.length > 1) {
          for (let i = 1; i < this.trail.length; i++) {
            const prev = this.trail[i - 1]
            const curr = this.trail[i]

            const gradient = ctx.createLinearGradient(
              prev.x, prev.y, curr.x, curr.y
            )
            gradient.addColorStop(0, `rgba(${this.color}, 0)`)
            gradient.addColorStop(1, `rgba(${this.color}, ${curr.opacity})`)

            ctx.beginPath()
            ctx.moveTo(prev.x, prev.y)
            ctx.lineTo(curr.x, curr.y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = this.size * ((i / this.trail.length) + 0.5)
            ctx.stroke()
          }
        }

        // Draw meteor head
        const headGradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 4
        )
        headGradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`)
        headGradient.addColorStop(0.5, `rgba(${this.color}, ${this.opacity * 0.5})`)
        headGradient.addColorStop(1, `rgba(${this.color}, 0)`)

        ctx.fillStyle = headGradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Draw bright core
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Background stars
    class BackgroundStar {
      x: number
      y: number
      size: number
      twinkle: number
      twinkleSpeed: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.size = Math.random() * 1.5
        this.twinkle = Math.random() * Math.PI * 2
        this.twinkleSpeed = Math.random() * 0.05 + 0.01
      }

      update() {
        this.twinkle += this.twinkleSpeed
      }

      draw(ctx: CanvasRenderingContext2D) {
        const opacity = (Math.sin(this.twinkle) + 1) / 2 * 0.8 + 0.2
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const meteors: Meteor[] = []
    const meteorCount = 5
    const stars: BackgroundStar[] = []
    const starCount = 100

    // Create meteors
    for (let i = 0; i < meteorCount; i++) {
      const meteor = new Meteor(canvas.width, canvas.height)
      // Stagger the meteors
      meteor.x += Math.random() * canvas.width
      meteor.y -= Math.random() * canvas.height / 2
      meteors.push(meteor)
    }

    // Create background stars
    for (let i = 0; i < starCount; i++) {
      stars.push(new BackgroundStar(canvas.width, canvas.height))
    }

    function animate() {
      if (!ctx || !canvas) return
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw and update stars
      stars.forEach(star => {
        star.update()
        star.draw(ctx)
      })

      // Draw and update meteors
      meteors.forEach(meteor => {
        meteor.update(canvas.width, canvas.height)
        meteor.draw(ctx)
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
