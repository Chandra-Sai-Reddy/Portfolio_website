"use client"

import { useEffect, useRef } from 'react'

// OPTION 2: FLOATING BUBBLES/ORBS EFFECT
export function FloatingOrbsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Orb {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
      pulsePhase: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 30 + 10
        this.pulsePhase = Math.random() * Math.PI * 2
        
        const colors = [
          '139, 92, 246',   // Purple
          '6, 182, 212',    // Cyan
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.pulsePhase += 0.02

        // Bounce off edges
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.vx = -this.vx
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.vy = -this.vy
        }

        // Add subtle floating motion
        this.y += Math.sin(this.pulsePhase) * 0.2
        this.x += Math.cos(this.pulsePhase) * 0.2
      }

      draw() {
        const pulseFactor = 1 + Math.sin(this.pulsePhase) * 0.1
        const currentRadius = this.radius * pulseFactor

        // Create gradient
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, currentRadius
        )
        gradient.addColorStop(0, `rgba(${this.color}, 0.8)`)
        gradient.addColorStop(0.5, `rgba(${this.color}, 0.3)`)
        gradient.addColorStop(1, `rgba(${this.color}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2)
        ctx.fill()

        // Inner glow
        ctx.fillStyle = `rgba(255, 255, 255, 0.4)`
        ctx.beginPath()
        ctx.arc(this.x - currentRadius * 0.3, this.y - currentRadius * 0.3, currentRadius * 0.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const orbs: Orb[] = []
    for (let i = 0; i < 30; i++) {
      orbs.push(new Orb())
    }

    let animationFrameId: number
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      orbs.forEach(orb => {
        orb.update()
        orb.draw()
      })
      
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

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
      className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-60"
      style={{ background: 'transparent' }}
    />
  )
}