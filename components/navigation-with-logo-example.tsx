// EXAMPLE: How to add logo to navigation
// Replace navigation.tsx with this code after saving your logo

import Image from 'next/image'
import Link from 'next/link'

// In the navigation component, add this logo section:

{/* Logo Section - Add this at the beginning of nav items */}
<Link href="/" className="flex items-center gap-2 shrink-0">
  <Image
    src="/logo.png"  // or /logo.svg - use your actual filename
    alt="DCS - Chandra Sai Reddy"
    width={120}  // Adjust based on your logo
    height={40}   // Adjust based on your logo
    className="h-8 md:h-10 w-auto"
    priority
  />
</Link>

// For mobile version:
<Link href="/" className="flex items-center gap-2">
  <Image
    src="/logo.png"
    alt="DCS - Chandra Sai Reddy"
    width={100}
    height={35}
    className="h-7 w-auto"
    priority
  />
</Link>
