"use client"

import { useState } from 'react'
import { StarfieldBackground } from './background-option1'
import { FloatingOrbsBackground } from './background-option2'
import { NetworkBackground } from './background-option3'
import { AuroraBackground } from './background-option4'
import { MatrixRainBackground } from './background-option5'
import { TornadoBackground } from './tornado-background'

export function BackgroundSelector() {
  // Change this number (1-6) to select different backgrounds
  // 1 = Starfield Galaxy
  // 2 = Floating Orbs
  // 3 = Network Constellation
  // 4 = Aurora Borealis
  // 5 = Matrix Rain
  // 6 = Tornado (original)
  
  const SELECTED_BACKGROUND = 1 // <-- CHANGE THIS NUMBER TO SELECT BACKGROUND

  switch (SELECTED_BACKGROUND) {
    case 1:
      return <StarfieldBackground />
    case 2:
      return <FloatingOrbsBackground />
    case 3:
      return <NetworkBackground />
    case 4:
      return <AuroraBackground />
    case 5:
      return <MatrixRainBackground />
    case 6:
      return <TornadoBackground />
    default:
      return <StarfieldBackground />
  }
}