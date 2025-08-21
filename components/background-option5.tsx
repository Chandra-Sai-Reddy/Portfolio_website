"use client"

import { useEffect, useRef } from 'react'

// OPTION 5: MATRIX DIGITAL RAIN EFFECT
export function MatrixRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100)
    }

    // Characters to use
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const charArray = chars.split('')

    class MatrixColumn {
      x: number
      y: number
      speed: number
      length: number
      chars: string[]
      colors: string[]

      constructor(x: number) {
        this.x = x
        this.y = Math.random() * -100
        this.speed = Math.random() * 2 + 1
        this.length = Math.floor(Math.random() * 20 + 10)
        this.chars = []
        this.colors = []
        
        for (let i = 0; i < this.length; i++) {
          this.chars.push(charArray[Math.floor(Math.random() * charArray.length)])
          
          // Color palette
          const colorChoices = [
            '139, 92, 246',   // Purple
            '6, 182, 212',    // Cyan
          ]
          this.colors.push(colorChoices[Math.floor(Math.random() * colorChoices.length)])
        }
      }

      update() {
        this.y += this.speed
        
        // Reset when off screen
        if (this.y - this.length * fontSize > canvas.height) {
          this.y = Math.random() * -100
          this.speed = Math.random() * 2 + 1
          this.length = Math.floor(Math.random() * 20 + 10)
          
          // Regenerate characters
          this.chars = []
          this.colors = []
          for (let i = 0; i < this.length; i++) {
            this.chars.push(charArray[Math.floor(Math.random() * charArray.length)])
            const colorChoices = [
              '139, 92, 246',
              '6, 182, 212',
            ]
            this.colors.push(colorChoices[Math.floor(Math.random() * colorChoices.length)])
          }
        }
        
        // Randomly change characters
        if (Math.random() < 0.02) {
          const index = Math.floor(Math.random() * this.chars.length)
          this.chars[index] = charArray[Math.floor(Math.random() * charArray.length)]
        }
      }

      draw() {
        for (let i = 0; i < this.chars.length; i++) {
          const y = this.y - i * fontSize
          
          if (y > 0 && y < canvas.height) {
            // Calculate opacity based on position in the column
            let opacity = 1 - (i / this.chars.length)
            
            // Head of the column is brightest
            if (i === 0) {
              // White glow for the head
              ctx.shadowColor = `rgba(255, 255, 255, 0.8)`
              ctx.shadowBlur = 10
              ctx.fillStyle = `rgba(255, 255, 255, 0.9)`
            } else {
              ctx.shadowBlur = 0
              ctx.fillStyle = `rgba(${this.colors[i]}, ${opacity})`
            }
            
            ctx.font = `${fontSize}px monospace`
            ctx.fillText(this.chars[i], this.x, y)
          }
        }
      }
    }

    const matrixColumns: MatrixColumn[] = []
    for (let i = 0; i < columns; i++) {
      matrixColumns.push(new MatrixColumn(i * fontSize))
    }

    let animationFrameId: number
    const animate = () => {
      // Create trail effect
      ctx.fillStyle = 'rgba(10, 10, 20, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw columns
      matrixColumns.forEach(column => {
        column.update()
        column.draw()
      })
      
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Recalculate columns
      const newColumns = Math.floor(canvas.width / fontSize)
      matrixColumns.length = 0
      for (let i = 0; i < newColumns; i++) {
        matrixColumns.push(new MatrixColumn(i * fontSize))
      }
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