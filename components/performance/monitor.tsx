"use client"

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== 'undefined') {
      // Preload critical resources
      const criticalResources = [
        '/Profile_photo.JPG',
        // Add other critical images
      ]

      criticalResources.forEach(resource => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = resource
        document.head.appendChild(link)
      })
    }
  }, [])

  return null
}

// Optimized motion configuration for better performance
export const optimizedMotionConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.3, // Reduced from 0.5 for better performance
    ease: "easeOut"
  }
}

export const optimizedHoverConfig = {
  whileHover: { 
    y: -2, // Reduced from -5/-8 for smoother performance
    transition: { duration: 0.2 }
  }
}
