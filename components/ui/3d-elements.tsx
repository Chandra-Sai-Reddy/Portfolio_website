"use client"

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text } from '@react-three/drei'
import * as THREE from 'three'

function FloatingSkillSphere({ position, skill, color }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.01
  })
  
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <Text
        position={[position[0], position[1] - 0.8, position[2]]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill}
      </Text>
    </Float>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 500 // Reduced for performance
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [particleCount])
  
  useFrame((state) => {
    if (!particlesRef.current) return
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    particlesRef.current.rotation.x = state.clock.elapsedTime * 0.03
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function Skills3DContent() {
  const skills = [
    { name: 'React', position: [-2, 1, 0], color: '#61dafb' },
    { name: 'AWS', position: [2, 1, 0], color: '#ff9900' },
    { name: 'Python', position: [0, -1, 0], color: '#3776ab' },
    { name: 'Docker', position: [-1.5, 0, 1], color: '#2496ed' },
    { name: 'ML/AI', position: [1.5, 0, 1], color: '#9333ea' },
  ]
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
      
      <ParticleField />
      
      {skills.map((skill) => (
        <FloatingSkillSphere
          key={skill.name}
          position={skill.position}
          skill={skill.name}
          color={skill.color}
        />
      ))}
      
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  )
}

export function Skills3D() {
  return (
    <div className="h-[500px] w-full">
      <Suspense fallback={
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-muted-foreground">Loading 3D visualization...</div>
        </div>
      }>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Skills3DContent />
        </Canvas>
      </Suspense>
    </div>
  )
}

// 3D Logo/Avatar
function Logo3D() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1
  })
  
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.2}
          speed={1}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      
      {/* Wireframe overlay */}
      <mesh>
        <octahedronGeometry args={[1.1, 2]} />
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.3} />
      </mesh>
    </Float>
  )
}

function Hero3DContent() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ffff" />
      
      <Logo3D />
      <ParticleField />
      
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 opacity-50">
      <Suspense fallback={
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      }>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Hero3DContent />
        </Canvas>
      </Suspense>
    </div>
  )
}

// DNA Helix for About section
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null)
  
  const points = useMemo(() => {
    const points = []
    for (let i = 0; i < 50; i++) {
      const t = i / 10
      const x1 = Math.sin(t) * 2
      const z1 = Math.cos(t) * 2
      const x2 = Math.sin(t + Math.PI) * 2
      const z2 = Math.cos(t + Math.PI) * 2
      const y = i * 0.2 - 5
      
      points.push([x1, y, z1], [x2, y, z2])
    }
    return points
  }, [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
  })
  
  return (
    <group ref={groupRef}>
      {points.map((point, i) => (
        <mesh key={i} position={point as [number, number, number]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color={i % 4 === 0 ? '#3b82f6' : i % 4 === 1 ? '#00ffff' : i % 4 === 2 ? '#ff00ff' : '#ffff00'}
            emissive={i % 4 === 0 ? '#3b82f6' : i % 4 === 1 ? '#00ffff' : i % 4 === 2 ? '#ff00ff' : '#ffff00'}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

function About3DContent() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      <DNAHelix />
      
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export function About3D() {
  return (
    <div className="h-[400px] w-full">
      <Suspense fallback={
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-muted-foreground">Loading 3D visualization...</div>
        </div>
      }>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <About3DContent />
        </Canvas>
      </Suspense>
    </div>
  )
}
