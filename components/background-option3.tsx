"use client"

import { useEffect, useRef } from 'react'

// OPTION 3: NETWORK CONSTELLATION EFFECT
export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Node {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 2 + 1
        
        const colors = [
          '139, 92, 246',   // Purple
          '6, 182, 212',    // Cyan
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0

        // Attract to mouse slightly
        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 200) {
          const force = (200 - dist) / 200 * 0.02
          this.vx += dx / dist * force
          this.vy += dy / dist * force
        }

        // Limit velocity
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
        if (speed > 2) {
          this.vx = (this.vx / speed) * 2
          this.vy = (this.vy / speed) * 2
        }
      }

      draw() {
        ctx.fillStyle = `rgba(${this.color}, 0.8)`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      connectTo(other: Node) {
        const dx = this.x - other.x
        const dy = this.y - other.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 150) {
          const opacity = (1 - dist / 150) * 0.5
          ctx.strokeStyle = `rgba(${this.color}, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(other.x, other.y)
          ctx.stroke()
        }
      }
    }

    const nodes: Node[] = []
    for (let i = 0; i < 100; i++) {
      nodes.push(new Node())
    }

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    let animationFrameId: number
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw nodes
      nodes.forEach(node => {
        node.update()
      })

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          nodes[i].connectTo(nodes[j])
        }
      }

      // Draw nodes on top
      nodes.forEach(node => {
        node.draw()
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
      window.removeEventListener('mousemove', handleMouseMove)
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