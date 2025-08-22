"use client"

import { useEffect, useRef } from 'react'

export function StarfieldWarpBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class WarpStar {
      x: number
      y: number
      z: number
      prevX: number
      prevY: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = (Math.random() - 0.5) * 2000
        this.y = (Math.random() - 0.5) * 2000
        this.z = Math.random() * 1000
        this.prevX = canvasWidth / 2
        this.prevY = canvasHeight / 2
      }

      update(canvasWidth: number, canvasHeight: number, speed: number) {
        this.prevX = this.x / (this.z * 0.001) + canvasWidth / 2
        this.prevY = this.y / (this.z * 0.001) + canvasHeight / 2

        this.z -= speed
        
        if (this.z < 1) {
          this.x = (Math.random() - 0.5) * 2000
          this.y = (Math.random() - 0.5) * 2000
          this.z = 1000
        }
      }

      draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
        const x = this.x / (this.z * 0.001) + canvasWidth / 2
        const y = this.y / (this.z * 0.001) + canvasHeight / 2

        const size = (1 - this.z / 1000) * 2
        const opacity = 1 - this.z / 1000

        // Draw the star trail
        if (this.z < 900) {
          ctx.beginPath()
          ctx.moveTo(this.prevX, this.prevY)
          ctx.lineTo(x, y)
          
          const gradient = ctx.createLinearGradient(this.prevX, this.prevY, x, y)
          gradient.addColorStop(0, `rgba(255, 255, 255, 0)`)
          gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity})`)
          
          ctx.strokeStyle = gradient
          ctx.lineWidth = size
          ctx.stroke()
        }

        // Draw the star
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()
      }
    }

    const stars: WarpStar[] = []
    const starCount = 500
    let warpSpeed = 2

    for (let i = 0; i < starCount; i++) {
      stars.push(new WarpStar(canvas.width, canvas.height))
    }

    function animate() {
      if (!ctx || !canvas) return
      
      // Create motion blur effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update warp speed (can be modified for effect)
      warpSpeed = 2 + Math.sin(Date.now() * 0.0001) * 1

      stars.forEach(star => {
        star.update(canvas.width, canvas.height, warpSpeed)
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
