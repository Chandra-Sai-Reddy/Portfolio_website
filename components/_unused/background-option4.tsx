"use client"

import { useEffect, useRef } from 'react'

// OPTION 4: AURORA BOREALIS
export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let time = 0

    function drawAurora(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
      const colors = [
        { r: 59, g: 130, b: 246 },  // Blue
        { r: 6, g: 182, b: 212 },   // Cyan
        { r: 168, g: 85, b: 247 },  // Purple
        { r: 34, g: 197, b: 94 }    // Green
      ]

      for (let i = 0; i < 3; i++) {
        const color = colors[i % colors.length]
        const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight)
        
        for (let j = 0; j < 5; j++) {
          const pos = j / 4
          const wave = Math.sin(time * 0.001 + i * 2 + j * 0.5) * 0.3 + 0.5
          gradient.addColorStop(
            pos,
            `rgba(${color.r}, ${color.g}, ${color.b}, ${wave * 0.1})`
          )
        }

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)
        
        // Wave effect
        ctx.beginPath()
        for (let x = 0; x < canvasWidth; x += 10) {
          const y = canvasHeight * 0.3 + 
                   Math.sin(x * 0.01 + time * 0.002 + i) * 100 +
                   Math.cos(x * 0.005 + time * 0.001) * 50
          
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.lineTo(canvasWidth, canvasHeight)
        ctx.lineTo(0, canvasHeight)
        ctx.closePath()
        
        const waveGradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
        waveGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
        waveGradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.05)`)
        waveGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`)
        
        ctx.fillStyle = waveGradient
        ctx.fill()
      }
    }

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      drawAurora(ctx, canvas.width, canvas.height)
      
      time++
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
