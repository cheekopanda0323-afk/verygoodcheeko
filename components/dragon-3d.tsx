"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"

function DragonModel() {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  // Placeholder geometry for a dragon (simplified)
  // In a real application, you would load a GLTF model here.
  return (
    <group ref={meshRef} position={[0, -2, 0]}>
      {/* Dragon Body / Neck placeholder */}
      <mesh position={[0, 3, 0]}>
        <torusGeometry args={[2, 0.5, 16, 100]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.8} />
      </mesh>
      {/* Dragon Head placeholder */}
      <mesh position={[0, 5, 2]} rotation={[-0.5, 0, 0]}>
        <coneGeometry args={[1, 2, 32]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.7} metalness={0.9} />
      </mesh>
       {/* Red Eye Glow */}
      <pointLight position={[0.5, 5, 2.5]} color="red" intensity={3} distance={5} />
      <pointLight position={[-0.5, 5, 2.5]} color="red" intensity={3} distance={5} />

      {/* Spikes/Scales placeholder */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} position={[Math.sin(i) * 2.2, 3 + Math.cos(i), Math.cos(i) * 2.2]}>
          <coneGeometry args={[0.2, 0.8, 8]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      ))}
    </group>
  )
}

export function Dragon3D() {
  return (
    <div className="w-full h-full bg-black">
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.3} color="#333" />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff4444" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4444ff" />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <DragonModel />
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
      </Canvas>
    </div>
  )
}
