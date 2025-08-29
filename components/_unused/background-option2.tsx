"use client"

import { useEffect, useRef } from 'react'

// OPTION 2: FLOATING ORBS
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
      radius: number
      vx: number
      vy: number
      color: string
      opacity: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.radius = Math.random() * 100 + 50
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        
        const colors = ['59, 130, 246', '6, 182, 212', '168, 85, 247']
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.opacity = Math.random() * 0.3 + 0.1
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx
        this.y += this.vy
        
        // Bounce off walls
        if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
          this.vx = -this.vx
        }
        
        if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
          this.vy = -this.vy
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        )
        
        gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`)
        gradient.addColorStop(0.5, `rgba(${this.color}, ${this.opacity * 0.5})`)
        gradient.addColorStop(1, `rgba(${this.color}, 0)`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const orbs: Orb[] = []
    const orbCount = 5

    for (let i = 0; i < orbCount; i++) {
      orbs.push(new Orb(canvas.width, canvas.height))
    }

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      orbs.forEach(orb => {
        orb.update(canvas.width, canvas.height)
        orb.draw(ctx)
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
