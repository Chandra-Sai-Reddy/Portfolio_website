"use client"

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isTouch, setIsTouch] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  
  useEffect(() => {
    // Detect touch device and mount status
    setIsMounted(true)
    const hasTouch = 'ontouchstart' in window || 
                     navigator.maxTouchPoints > 0 ||
                     window.matchMedia('(pointer: coarse)').matches
    
    setIsTouch(hasTouch)
    
    // Add class to body for CSS targeting
    if (!hasTouch) {
      document.body.classList.add('custom-cursor-enabled')
      
      // Immediate fallback detection - much faster than 1000ms
      const checkCursor = () => {
        const cursorElement = document.querySelector('.custom-cursor')
        if (!cursorElement) {
          document.body.classList.add('cursor-fallback')
          console.warn('Custom cursor element not found, enabling fallback')
        } else {
          document.body.classList.remove('cursor-fallback')
        }
      }
      
      // Check immediately and periodically
      setTimeout(checkCursor, 100)
      setTimeout(checkCursor, 500)
      
      // Safety net - if still no cursor after 2 seconds, force fallback
      setTimeout(() => {
        if (!document.querySelector('.custom-cursor')) {
          document.body.classList.add('cursor-fallback')
        }
      }, 2000)
    }
    
    // Add keyboard shortcut to toggle cursor (Ctrl+Shift+C)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        const body = document.body
        if (body.classList.contains('cursor-fallback')) {
          body.classList.remove('cursor-fallback')
          console.log('Custom cursor re-enabled')
        } else {
          body.classList.add('cursor-fallback')
          console.log('Custom cursor disabled, system cursor enabled')
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('custom-cursor-enabled', 'cursor-fallback')
    }
  }, [])
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    
    const updateCursorType = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check for special cursor attributes
      if (target.dataset.cursorText) {
        setCursorText(target.dataset.cursorText)
        setCursorVariant('text')
      } else if (target.dataset.cursorMagnetic) {
        setCursorVariant('magnetic')
      } else {
        setCursorText('')
        setCursorVariant('default')
      }
      
      // Check if hovering over interactive elements
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
        
      setIsPointer(isClickable)
    }
    
    const handleMouseEnter = () => setIsHidden(false)
    const handleMouseLeave = () => setIsHidden(true)
    
    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', updateCursorType)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', updateCursorType)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY])
  
  // Magnetic effect for buttons
  useEffect(() => {
    const magneticElements = document.querySelectorAll('[data-cursor-magnetic]')
    
    const handleMagneticHover = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      
      // Move element slightly toward cursor
      target.style.transform = `translate(${distX * 0.1}px, ${distY * 0.1}px)`
    }
    
    const handleMagneticLeave = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      target.style.transform = 'translate(0, 0)'
    }
    
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', handleMagneticHover as any)
      el.addEventListener('mouseleave', handleMagneticLeave as any)
    })
    
    return () => {
      magneticElements.forEach(el => {
        el.removeEventListener('mousemove', handleMagneticHover as any)
        el.removeEventListener('mouseleave', handleMagneticLeave as any)
      })
    }
  }, [])
  
  // Don't render on touch devices or during SSR
  if (!isMounted || isTouch || isHidden) return null
  
  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="custom-cursor fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isPointer ? 2 : cursorVariant === 'text' ? 3 : 1,
            backgroundColor: isPointer ? 'rgba(59, 130, 246, 0.5)' : 'transparent',
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          className="relative"
        >
          {/* Outer ring */}
          <motion.div
            animate={{
              width: isPointer ? '40px' : cursorVariant === 'text' ? '80px' : '32px',
              height: isPointer ? '40px' : cursorVariant === 'text' ? '80px' : '32px',
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className="rounded-full border-2 border-foreground/50"
          />
          
          {/* Cursor text */}
          {cursorText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-foreground text-xs font-bold whitespace-nowrap"
            >
              {cursorText}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
      
      {/* Cursor dot */}
      <motion.div
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isPointer ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 40 }}
      />
      
      {/* Trailing effect */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.02 }}
      >
        <div className="w-10 h-10 rounded-full bg-primary/20 blur-xl" />
      </motion.div>
    </>
  )
}
