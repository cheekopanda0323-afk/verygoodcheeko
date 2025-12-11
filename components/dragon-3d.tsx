"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function Dragon3D() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const container = containerRef.current
    if (!container) return

    // Create scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000000, 10, 50)

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    )
    camera.position.z = 8

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    })
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
    scene.add(ambientLight)

    const spotLight = new THREE.SpotLight(0xffffff, 1)
    spotLight.position.set(0, 10, 10)
    spotLight.castShadow = true
    spotLight.angle = Math.PI / 6
    spotLight.penumbra = 0.3
    scene.add(spotLight)

    const rimLight = new THREE.PointLight(0x4444ff, 0.5)
    rimLight.position.set(-5, 0, -5)
    scene.add(rimLight)

    const redLight = new THREE.PointLight(0xff0000, 0.3)
    redLight.position.set(5, 0, -5)
    scene.add(redLight)

    // Create Batman 3D model
    const batmanGroup = new THREE.Group()

    // Body (torso)
    const bodyGeometry = new THREE.CylinderGeometry(0.8, 1, 2.5, 8)
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x0a0a0a,
      shininess: 30,
      specular: 0x333333
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.castShadow = true
    body.position.y = 0
    batmanGroup.add(body)

    // Head
    const headGeometry = new THREE.SphereGeometry(0.7, 16, 16)
    const headMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a1a,
      shininess: 20
    })
    const head = new THREE.Mesh(headGeometry, headMaterial)
    head.castShadow = true
    head.position.y = 2
    batmanGroup.add(head)

    // Bat Ears
    const earGeometry = new THREE.ConeGeometry(0.2, 0.8, 4)
    const earMaterial = new THREE.MeshPhongMaterial({ color: 0x0a0a0a })
    
    const leftEar = new THREE.Mesh(earGeometry, earMaterial)
    leftEar.position.set(-0.4, 2.8, 0)
    leftEar.castShadow = true
    batmanGroup.add(leftEar)

    const rightEar = new THREE.Mesh(earGeometry, earMaterial)
    rightEar.position.set(0.4, 2.8, 0)
    rightEar.castShadow = true
    batmanGroup.add(rightEar)

    // Glowing eyes
    const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8)
    const eyeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xaaaaff,
      emissive: 0x6666ff,
      emissiveIntensity: 2
    })
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    leftEye.position.set(-0.25, 2.1, 0.6)
    batmanGroup.add(leftEye)

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    rightEye.position.set(0.25, 2.1, 0.6)
    batmanGroup.add(rightEye)

    // Eye glow
    const eyeGlow = new THREE.PointLight(0x8888ff, 1, 3)
    eyeGlow.position.set(0, 2.1, 0.6)
    batmanGroup.add(eyeGlow)

    // Cape
    const capeGeometry = new THREE.ConeGeometry(2, 3, 8)
    const capeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x000000,
      shininess: 10,
      side: THREE.DoubleSide
    })
    const cape = new THREE.Mesh(capeGeometry, capeMaterial)
    cape.castShadow = true
    cape.position.set(0, 0.5, -0.8)
    cape.rotation.x = Math.PI
    batmanGroup.add(cape)

    // Bat Symbol on chest
    const symbolGeometry = new THREE.CircleGeometry(0.4, 16)
    const symbolMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x666666,
      emissive: 0x333333
    })
    const symbol = new THREE.Mesh(symbolGeometry, symbolMaterial)
    symbol.position.set(0, 0.5, 0.81)
    batmanGroup.add(symbol)

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.2, 0.15, 1.5, 8)
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x0a0a0a })
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial)
    leftArm.position.set(-1, 0, 0)
    leftArm.rotation.z = Math.PI / 6
    leftArm.castShadow = true
    batmanGroup.add(leftArm)

    const rightArm = new THREE.Mesh(armGeometry, armMaterial)
    rightArm.position.set(1, 0, 0)
    rightArm.rotation.z = -Math.PI / 6
    rightArm.castShadow = true
    batmanGroup.add(rightArm)

    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.25, 0.2, 1.8, 8)
    
    const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial)
    leftLeg.position.set(-0.4, -2, 0)
    leftLeg.castShadow = true
    batmanGroup.add(leftLeg)

    const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial)
    rightLeg.position.set(0.4, -2, 0)
    rightLeg.castShadow = true
    batmanGroup.add(rightLeg)

    scene.add(batmanGroup)

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 500
    const positions = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x666666,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation
    let time = 0
    function animate() {
      requestAnimationFrame(animate)
      time += 0.01

      // Breathing animation
      body.scale.y = 1 + Math.sin(time * 2) * 0.05
      cape.scale.y = 1 + Math.sin(time * 1.5) * 0.05

      // Arms swing
      leftArm.rotation.z = Math.PI / 6 + Math.sin(time) * 0.1
      rightArm.rotation.z = -Math.PI / 6 - Math.sin(time) * 0.1

      // Eye glow pulse
      eyeGlow.intensity = 1 + Math.sin(time * 3) * 0.3

      // Smooth mouse follow
      targetRotationY = mouseX * 0.5
      targetRotationX = mouseY * 0.3

      batmanGroup.rotation.y += (targetRotationY - batmanGroup.rotation.y) * 0.05
      batmanGroup.rotation.x += (targetRotationX - batmanGroup.rotation.x) * 0.05

      // Auto rotation when mouse not moving
      if (Math.abs(mouseX) < 0.01 && Math.abs(mouseY) < 0.01) {
        batmanGroup.rotation.y = Math.sin(time * 0.3) * 0.3
      }

      // Particles rotation
      particles.rotation.y = time * 0.05

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = container.offsetWidth / container.offsetHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.offsetWidth, container.offsetHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="w-full h-full min-h-[500px] bg-gradient-to-b from-[#000000] via-[#0a0a0a] to-[#050505] rounded-2xl relative overflow-hidden border border-gray-800/30 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
      
      {/* 3D Container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60 pointer-events-none" />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900/20 to-transparent pointer-events-none" />

      {/* Footer with "cheekoissogood 🥀" */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm border-t border-gray-800/30 py-4">
        <div className="text-center">
          <div className="text-gray-400 text-lg font-bold tracking-[0.2em] uppercase mb-1 animate-pulse">
            THE DARK KNIGHT
          </div>
          <div className="flex items-center justify-center gap-2 text-red-500/80 text-sm font-mono tracking-wider">
            <span className="animate-pulse">cheekoissogood</span>
            <span className="text-red-400 animate-bounce">🥀</span>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-gray-700/50" />
      <div className="absolute top-4 right-4 w-10 h-10 border-r-2 border-t-2 border-gray-700/50" />
      <div className="absolute bottom-20 left-4 w-10 h-10 border-l-2 border-b-2 border-gray-700/50" />
      <div className="absolute bottom-20 right-4 w-10 h-10 border-r-2 border-b-2 border-gray-700/50" />

      {/* Instruction hint */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-gray-600 text-xs font-mono tracking-wider pointer-events-none">
        Move your mouse to interact
      </div>
    </div>
  )
        }
