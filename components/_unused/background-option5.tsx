"use client"

import { useEffect, useRef } from 'react'

// OPTION 5: MATRIX RAIN
export function MatrixRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'
    const fontSize = 16
    const columns = canvas.width / fontSize
    
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    function draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)
      
      ctx.fillStyle = '#0ea5e9'
      ctx.font = `${fontSize}px monospace`
      
      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length))
        const x = i * fontSize
        const y = drops[i] * fontSize
        
        // Gradient effect
        const gradient = 1 - (y / canvasHeight)
        ctx.fillStyle = `rgba(14, 165, 233, ${gradient})`
        
        ctx.fillText(text, x, y)
        
        if (y > canvasHeight && Math.random() > 0.975) {
          drops[i] = 0
        }
        
        drops[i]++
      }
    }

    function animate() {
      if (!ctx || !canvas) return
      draw(ctx, canvas.width, canvas.height)
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      const newColumns = canvas.width / fontSize
      const newDrops: number[] = []
      
      for (let i = 0; i < newColumns; i++) {
        newDrops[i] = drops[i] || Math.random() * -100
      }
      
      drops.length = 0
      drops.push(...newDrops)
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
