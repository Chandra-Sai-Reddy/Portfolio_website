"use client"

import { useState } from 'react'
import { MultiDirectionalStarsBackground } from './motion-backgrounds/multi-directional-stars'
import { CosmicVortexBackground } from './motion-backgrounds/cosmic-vortex'
import { MeteorShowerBackground } from './motion-backgrounds/meteor-shower'
import { StarfieldBackground } from './motion-backgrounds/starfield'

export function BackgroundSelector() {
  // Change this number (1-4) to select different backgrounds
  // 1 = Multi-Directional Stars (stars moving in all directions)
  // 2 = Cosmic Vortex (spiral star effect)
  // 3 = Meteor Shower (falling stars with trails)
  // 4 = Classic Starfield (traditional from center)
  
  const SELECTED_BACKGROUND: number = 1 // <-- CHANGE THIS NUMBER TO SELECT BACKGROUND

  switch (SELECTED_BACKGROUND) {
    case 1:
      return <MultiDirectionalStarsBackground />
    case 2:
      return <CosmicVortexBackground />
    case 3:
      return <MeteorShowerBackground />
    case 4:
      return <StarfieldBackground />
    default:
      return <MultiDirectionalStarsBackground />
  }
}