"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { OrbitControls, Sparkles, Float } from "@react-three/drei"
import * as THREE from "three"

// --- COMPONENT: DRAGON BODY ---
function DragonBody() {
  const meshRef = useRef<THREE.Mesh>(null)

  // 1. Create the spinal curve
  const curve = useMemo(() => {
    const points = []
    // Create a spiral/snake shape
    for (let i = 0; i < 100; i++) {
      const t = i / 100
      const x = Math.sin(t * Math.PI * 4) * 2.5
      const y = Math.cos(t * Math.PI * 4) * 2.5 + (t * 10 - 5)
      const z = Math.sin(t * Math.PI * 8) * 1.5
      points.push(new THREE.Vector3(x, y, z))
    }
    return new THREE.CatmullRomCurve3(points)
  }, [])

  // 2. Animation Loop
  useFrame((state) => {
    if (meshRef.current) {
      // Rotate the whole body slowly
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      // Bob up and down slightly
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        {/* Tube Geometry: path, segments, radius, radiusSegments, closed */}
        <tubeGeometry args={[curve, 128, 0.5, 16, false]} />
        {/* Metallic Dark Material */}
        <meshStandardMaterial 
          color="#1a1a1a" 
          emissive="#050505"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Red mystical particles following the general area */}
      <Sparkles 
        count={60} 
        scale={10} 
        size={4} 
        speed={0.4} 
        opacity={0.6} 
        color="#ff0000"
      />
    </group>
  )
}

// --- COMPONENT: DRAGON HEAD ---
function DragonHead() {
  return (
    // Float makes the head hover independently for a "living" feel
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[4.5, 5]}>
      <group>
        {/* Main Head Cone */}
        <mesh rotation={[0.5, 0, 0]}>
          <coneGeometry args={[0.7, 2.5, 6]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.9} />
        </mesh>
        
        {/* Glowing Left Eye */}
        <mesh position={[0.25, -0.2, 0.4]}>
          <sphereGeometry args={[0.12]} />
          <meshBasicMaterial color="#ff0000" toneMapped={false} />
          <pointLight color="#ff0000" intensity={10} distance={1.5} decay={2} />
        </mesh>

        {/* Glowing Right Eye */}
        <mesh position={[-0.25, -0.2, 0.4]}>
          <sphereGeometry args={[0.12]} />
          <meshBasicMaterial color="#ff0000" toneMapped={false} />
          <pointLight color="#ff0000" intensity={10} distance={1.5} decay={2} />
        </mesh>

        {/* Breath Particles */}
        <Sparkles 
            position={[0, -1.5, 0.5]} 
            count={30} 
            scale={[1, 3, 1]} 
            color={"#ff3300"} 
            size={8} 
            speed={1.5} 
            noise={0.5}
            opacity={0.8}
        />
      </group>
    </Float>
  )
}

// --- MAIN EXPORT ---
export function Dragon3D() {
  return (
    <div className="w-full h-full min-h-[500px] bg-black rounded-xl overflow-hidden relative shadow-2xl border border-white/5">
      <Canvas camera={{ position: [0, 0, 14], fov: 40 }}>
        {/* 1. Background Color */}
        <color attach="background" args={['#050505']} />
        
        {/* 2. Fog for depth */}
        <fog attach="fog" args={['#050505', 10, 25]} />

        {/* 3. Lights */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={500} color="#ff0000" castShadow />
        <pointLight position={[-10, -10, -10]} intensity={200} color="#202020" />
        
        {/* 4. Scene Content */}
        <group position={[0, -2, 0]}>
          <DragonBody />
          <DragonHead />
        </group>

        {/* 5. Environment Dust */}
        <Sparkles count={200} scale={25} size={1} speed={0.1} opacity={0.3} color="#ffffff" />
        
        {/* 6. Controls (Interaction) */}
        <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5} // Prevent going below the dragon
            minPolarAngle={Math.PI / 3} // Prevent going above too much
        />
      </Canvas>
      
      {/* Overlay Text */}
      <div className="absolute bottom-6 left-6 text-red-500/80 text-xs font-mono tracking-widest pointer-events-none">
        /// SYSTEM_GUARDIAN_ACTIVE
      </div>
    </div>
  )
        }
