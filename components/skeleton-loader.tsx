"use client"

import { motion } from 'framer-motion'

export function SkeletonCard() {
  return (
    <div className="glass rounded-3xl p-8 border border-border/50">
      <div className="space-y-4">
        {/* Title skeleton */}
        <div className="skeleton h-8 w-3/4 rounded-lg" />
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="skeleton h-4 w-full rounded-lg" />
          <div className="skeleton h-4 w-5/6 rounded-lg" />
          <div className="skeleton h-4 w-4/6 rounded-lg" />
        </div>
        
        {/* Tags skeleton */}
        <div className="flex gap-2">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-20 rounded-full" />
          <div className="skeleton h-6 w-18 rounded-full" />
        </div>
        
        {/* Button skeleton */}
        <div className="skeleton h-10 w-32 rounded-xl" />
      </div>
    </div>
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4 rounded-lg"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  )
}

export function SkeletonCircle({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }
  
  return <div className={`skeleton ${sizes[size]} rounded-full`} />
}