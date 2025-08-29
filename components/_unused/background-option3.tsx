"use client"

import { useEffect, useRef } from 'react'

// OPTION 3: NETWORK CONSTELLATION
export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
      
      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 2 + 1
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx
        this.y += this.vy
        
        if (this.x < 0 || this.x > canvasWidth) this.vx = -this.vx
        if (this.y < 0 || this.y > canvasHeight) this.vy = -this.vy
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(59, 130, 246, 0.8)'
        ctx.fill()
      }
    }

    const nodes: Node[] = []
    const nodeCount = 50
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node(canvas.width, canvas.height))
    }

    function drawConnections(ctx: CanvasRenderingContext2D) {
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach(otherNode => {
          const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y)
          
          if (distance < 150) {
            const opacity = 1 - distance / 150
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.3})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      drawConnections(ctx)
      
      nodes.forEach(node => {
        node.update(canvas.width, canvas.height)
        node.draw(ctx)
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
