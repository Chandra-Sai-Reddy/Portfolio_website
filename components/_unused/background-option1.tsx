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

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth - canvasWidth / 2
        this.y = Math.random() * canvasHeight - canvasHeight / 2
        this.z = Math.random() * 1000
        this.prevX = 0
        this.prevY = 0
        this.size = 0
        
        const colors = ['255, 255, 255', '59, 130, 246', '6, 182, 212']
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.prevX = this.x / this.z * 100 + canvasWidth / 2
        this.prevY = this.y / this.z * 100 + canvasHeight / 2
        
        this.z -= 2
        
        if (this.z <= 0) {
          this.x = Math.random() * canvasWidth - canvasWidth / 2
          this.y = Math.random() * canvasHeight - canvasHeight / 2
          this.z = 1000
        }
        
        this.size = (1 - this.z / 1000) * 3
      }

      draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
        const x = this.x / this.z * 100 + canvasWidth / 2
        const y = this.y / this.z * 100 + canvasHeight / 2
        
        // Draw star
        ctx.beginPath()
        ctx.fillStyle = `rgba(${this.color}, ${1 - this.z / 1000})`
        ctx.arc(x, y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
        
        // Draw trail
        ctx.beginPath()
        const gradient = ctx.createLinearGradient(this.prevX, this.prevY, x, y)
        gradient.addColorStop(0, `rgba(${this.color}, 0)`)
        gradient.addColorStop(1, `rgba(${this.color}, ${0.5 - this.z / 1000})`)
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = this.size / 2
        ctx.moveTo(this.prevX, this.prevY)
        ctx.lineTo(x, y)
        ctx.stroke()
      }
    }

    const stars: Star[] = []
    const starCount = 150

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star(canvas.width, canvas.height))
    }

    function animate() {
      if (!ctx || !canvas) return
      
      // Create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw stars
      stars.forEach(star => {
        star.update(canvas.width, canvas.height)
        star.draw(ctx, canvas.width, canvas.height)
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
