"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { OrbitControls, Sparkles, Float } from "@react-three/drei"
import * as THREE from "three"

// Procedurally generate a winding dragon body curve
function DragonBody() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Create a winding curve for the dragon's body
  const curve = useMemo(() => {
    const points = []
    for (let i = 0; i < 100; i++) {
      const t = i / 100
      // Create a spiral/snake shape
      const x = Math.sin(t * Math.PI * 4) * 3
      const y = Math.cos(t * Math.PI * 4) * 3 + (t * 10 - 5)
      const z = Math.sin(t * Math.PI * 8) * 1.5
      points.push(new THREE.Vector3(x, y, z))
    }
    return new THREE.CatmullRomCurve3(points)
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2
    }
  })

  return (
    <group>
      {/* The Serpentine Body */}
      <mesh ref={meshRef}>
        <tubeGeometry args={[curve, 64, 0.6, 8, false]} />
        <meshStandardMaterial 
          color="#050505" 
          roughness={0.4}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Spikes along the spine (represented by particles for "mystical" effect) */}
      <Sparkles 
        count={50} 
        scale={12} 
        size={4} 
        speed={0.4} 
        opacity={0.5} 
        color="#880000" // Dark red sparkles
      />
    </group>
  )
}

function DragonHead() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={[0, 4.5, 0]}>
        {/* Abstract Head Shape */}
        <mesh rotation={[0.5, 0, 0]}>
          <coneGeometry args={[0.8, 2.5, 6]} />
          <meshStandardMaterial color="#080808" roughness={0.2} metalness={1} />
        </mesh>
        
        {/* Glowing Red Eyes */}
        <mesh position={[0.3, -0.2, 0.5]}>
          <sphereGeometry args={[0.15]} />
          <meshBasicMaterial color="#ff0000" toneMapped={false} />
          <pointLight color="#ff0000" intensity={2} distance={2} />
        </mesh>
        <mesh position={[-0.3, -0.2, 0.5]}>
          <sphereGeometry args={[0.15]} />
          <meshBasicMaterial color="#ff0000" toneMapped={false} />
          <pointLight color="#ff0000" intensity={2} distance={2} />
        </mesh>

        {/* Smoke/Fire Breath Effect */}
        <Sparkles 
            position={[0, -2, 1]} 
            count={20} 
            scale={[1, 4, 1]} 
            color={"#ff4400"} 
            size={10} 
            speed={2} 
            noise={1}
        />
      </group>
    </Float>
  )
}

export function Dragon3D() {
  return (
    <div className="w-full h-full min-h-[400px] bg-neutral-950 rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        {/* Dark Background */}
        <color attach="background" args={['#020202']} />
        
        {/* Atmospheric Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} color="#4a0000" />
        <pointLight position={[-10, -5, -10]} intensity={2} color="#1a1a1a" />
        
        {/* The Dragon */}
        <group position={[0, -1, 0]}>
          <DragonBody />
          <DragonHead />
        </group>

        {/* Environment particles */}
        <Sparkles count={100} scale={20} size={2} speed={0.2} opacity={0.2} color="#ffffff" />
        
        <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
        />
      </Canvas>
      
      {/* HTML Overlay for style */}
      <div className="absolute bottom-4 left-4 text-white/50 text-xs font-mono pointer-events-none">
        DRAGON_SYSTEM_V1 // ONLINE
      </div>
    </div>
  )
}
