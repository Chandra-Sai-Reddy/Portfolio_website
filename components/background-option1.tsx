"use client"

import { useEffect, useRef } from 'react'

// OPTION 1: STARFIELD GALAXY EFFECT
export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Star {
      x: number
      y: number
      z: number
      prevX: number
      prevY: number
      size: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width - canvas.width / 2
        this.y = Math.random() * canvas.height - canvas.height / 2
        this.z = Math.random() * 1000
        this.prevX = 0
        this.prevY = 0
        this.size = 0
        
        const colors = ['255, 255, 255', '139, 92, 246', '6, 182, 212']
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.prevX = this.x / this.z * 100 + canvas.width / 2
        this.prevY = this.y / this.z * 100 + canvas.height / 2
        
        this.z -= 2
        
        if (this.z <= 0) {
          this.x = Math.random() * canvas.width - canvas.width / 2
          this.y = Math.random() * canvas.height - canvas.height / 2
          this.z = 1000
        }
        
        this.size = (1 - this.z / 1000) * 3
      }

      draw() {
        const x = this.x / this.z * 100 + canvas.width / 2
        const y = this.y / this.z * 100 + canvas.height / 2
        
        // Draw trail
        ctx.strokeStyle = `rgba(${this.color}, ${(1 - this.z / 1000) * 0.5})`
        ctx.lineWidth = this.size
        ctx.beginPath()
        ctx.moveTo(this.prevX, this.prevY)
        ctx.lineTo(x, y)
        ctx.stroke()
        
        // Draw star
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.size * 2)
        gradient.addColorStop(0, `rgba(${this.color}, 1)`)
        gradient.addColorStop(1, `rgba(${this.color}, 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, this.size * 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const stars: Star[] = []
    for (let i = 0; i < 200; i++) {
      stars.push(new Star())
    }

    let animationFrameId: number
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      stars.forEach(star => {
        star.update()
        star.draw()
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
      className="fixed inset-0 z-0 pointer-events-none opacity-50 dark:opacity-70"
      style={{ background: 'transparent' }}
    />
  )
}