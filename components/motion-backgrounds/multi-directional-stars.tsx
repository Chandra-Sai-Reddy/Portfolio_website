"use client"

import { useEffect, useRef } from 'react'

export function MultiDirectionalStarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Star {
      x: number = 0
      y: number = 0
      z: number = 1000
      prevX: number = 0
      prevY: number = 0
      size: number = 0
      color: string = ''
      speedX: number = 0
      speedY: number = 0
      speedZ: number = 0
      direction: 'up' | 'down' | 'left' | 'right' | 'center' | 'diagonal-tl' | 'diagonal-tr' | 'diagonal-bl' | 'diagonal-br'

      constructor(canvasWidth: number, canvasHeight: number) {
        // Randomly choose direction
        const directions = ['up', 'down', 'left', 'right', 'center', 
                          'diagonal-tl', 'diagonal-tr', 'diagonal-bl', 'diagonal-br'] as const
        this.direction = directions[Math.floor(Math.random() * directions.length)]
        
        this.reset(canvasWidth, canvasHeight)
        
        const colors = ['255, 255, 255', '59, 130, 246', '6, 182, 212', '168, 85, 247', '0, 255, 255']
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      reset(canvasWidth: number, canvasHeight: number) {
        this.z = Math.random() * 1000
        const baseSpeed = Math.random() * 2 + 1

        switch(this.direction) {
          case 'up':
            this.x = Math.random() * canvasWidth
            this.y = canvasHeight + 50
            this.speedX = 0
            this.speedY = -baseSpeed
            this.speedZ = 0
            break
            
          case 'down':
            this.x = Math.random() * canvasWidth
            this.y = -50
            this.speedX = 0
            this.speedY = baseSpeed
            this.speedZ = 0
            break
            
          case 'left':
            this.x = canvasWidth + 50
            this.y = Math.random() * canvasHeight
            this.speedX = -baseSpeed
            this.speedY = 0
            this.speedZ = 0
            break
            
          case 'right':
            this.x = -50
            this.y = Math.random() * canvasHeight
            this.speedX = baseSpeed
            this.speedY = 0
            this.speedZ = 0
            break
            
          case 'center':
            this.x = Math.random() * canvasWidth - canvasWidth / 2
            this.y = Math.random() * canvasHeight - canvasHeight / 2
            this.speedX = 0
            this.speedY = 0
            this.speedZ = -baseSpeed * 2
            break
            
          case 'diagonal-tl':
            this.x = canvasWidth + 50
            this.y = canvasHeight + 50
            this.speedX = -baseSpeed * 0.7
            this.speedY = -baseSpeed * 0.7
            this.speedZ = 0
            break
            
          case 'diagonal-tr':
            this.x = -50
            this.y = canvasHeight + 50
            this.speedX = baseSpeed * 0.7
            this.speedY = -baseSpeed * 0.7
            this.speedZ = 0
            break
            
          case 'diagonal-bl':
            this.x = canvasWidth + 50
            this.y = -50
            this.speedX = -baseSpeed * 0.7
            this.speedY = baseSpeed * 0.7
            this.speedZ = 0
            break
            
          case 'diagonal-br':
            this.x = -50
            this.y = -50
            this.speedX = baseSpeed * 0.7
            this.speedY = baseSpeed * 0.7
            this.speedZ = 0
            break
        }

        this.prevX = this.x
        this.prevY = this.y
        this.size = 0
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.prevX = this.direction === 'center' 
          ? this.x / this.z * 100 + canvasWidth / 2
          : this.x
        this.prevY = this.direction === 'center'
          ? this.y / this.z * 100 + canvasHeight / 2  
          : this.y

        // Update position based on direction
        if (this.direction === 'center') {
          this.z += this.speedZ
          if (this.z <= 0) {
            this.reset(canvasWidth, canvasHeight)
          }
          this.size = (1 - this.z / 1000) * 3
        } else {
          this.x += this.speedX
          this.y += this.speedY
          this.size = Math.random() * 2 + 1

          // Check boundaries based on direction
          let shouldReset = false
          
          switch(this.direction) {
            case 'up':
              if (this.y < -50) shouldReset = true
              break
            case 'down':
              if (this.y > canvasHeight + 50) shouldReset = true
              break
            case 'left':
              if (this.x < -50) shouldReset = true
              break
            case 'right':
              if (this.x > canvasWidth + 50) shouldReset = true
              break
            case 'diagonal-tl':
              if (this.x < -50 || this.y < -50) shouldReset = true
              break
            case 'diagonal-tr':
              if (this.x > canvasWidth + 50 || this.y < -50) shouldReset = true
              break
            case 'diagonal-bl':
              if (this.x < -50 || this.y > canvasHeight + 50) shouldReset = true
              break
            case 'diagonal-br':
              if (this.x > canvasWidth + 50 || this.y > canvasHeight + 50) shouldReset = true
              break
          }
          
          if (shouldReset) {
            this.reset(canvasWidth, canvasHeight)
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
        let x = this.x
        let y = this.y
        let opacity = 1

        if (this.direction === 'center') {
          x = this.x / this.z * 100 + canvasWidth / 2
          y = this.y / this.z * 100 + canvasHeight / 2
          opacity = 1 - this.z / 1000
        }

        // Draw star with higher opacity
        ctx.beginPath()
        ctx.fillStyle = `rgba(${this.color}, ${Math.min(opacity * 1.5, 1)})`
        ctx.arc(x, y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()

        // Add bright glow effect to all stars
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, this.size * 3)
        glowGradient.addColorStop(0, `rgba(${this.color}, ${Math.min(opacity * 0.8, 1)})`)
        glowGradient.addColorStop(0.5, `rgba(${this.color}, ${Math.min(opacity * 0.4, 1)})`)
        glowGradient.addColorStop(1, `rgba(${this.color}, 0)`)
        
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(x, y, this.size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Draw brighter trail for moving stars
        if (this.direction !== 'center' || this.z < 900) {
          ctx.beginPath()
          
          const gradient = ctx.createLinearGradient(this.prevX, this.prevY, x, y)
          gradient.addColorStop(0, `rgba(${this.color}, 0)`)
          gradient.addColorStop(1, `rgba(${this.color}, ${Math.min(opacity * 0.8, 1)})`)
          
          ctx.strokeStyle = gradient
          ctx.lineWidth = this.size / 1.5
          ctx.moveTo(this.prevX, this.prevY)
          ctx.lineTo(x, y)
          ctx.stroke()
        }
      }
    }

    // Nebula background effect
    class Nebula {
      x: number
      y: number
      radius: number
      color: string
      opacity: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.radius = Math.random() * 200 + 100
        
        const colors = ['59, 130, 246', '6, 182, 212', '168, 85, 247', '244, 114, 182']
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.opacity = Math.random() * 0.02 + 0.01
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

    const stars: Star[] = []
    const starCount = 300 // Increased from 200 for more visible effect
    const nebulas: Nebula[] = []
    const nebulaCount = 5 // Increased for more background ambiance

    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star(canvas.width, canvas.height))
    }

    // Create nebulas
    for (let i = 0; i < nebulaCount; i++) {
      nebulas.push(new Nebula(canvas.width, canvas.height))
    }

    function animate() {
      if (!ctx || !canvas) return
      
      // Create subtle trail effect (reduced for brighter particles)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw nebulas (background)
      nebulas.forEach(nebula => {
        nebula.draw(ctx)
      })
      
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

      // Recreate nebulas on resize
      nebulas.length = 0
      for (let i = 0; i < nebulaCount; i++) {
        nebulas.push(new Nebula(canvas.width, canvas.height))
      }
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
