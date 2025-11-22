"use client"

import { useEffect, useRef } from "react"

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    interface Particle {
      x: number
      y: number
      size: number
      speedY: number
      speedX: number
      opacity: number
      maxOpacity: number
      depth: number
    }

    const particles: Particle[] = []

    for (let i = 0; i < 150; i++) {
      const depth = Math.random()
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 5 + 0.8,
        speedY: Math.random() * 1.5 + 0.6,
        speedX: (Math.random() - 0.5) * 1.2,
        opacity: 0,
        maxOpacity: depth * 0.8 + 0.3,
        depth: depth,
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(19, 0, 3, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.y += particle.speedY
        particle.x += particle.speedX

        if (particle.opacity < particle.maxOpacity) {
          particle.opacity += 0.005
        } else if (particle.y < canvas.height * 0.5) {
          particle.opacity = particle.maxOpacity
        } else {
          particle.opacity -= 0.003
        }

        if (particle.y > canvas.height || particle.opacity <= 0) {
          particle.y = -10
          particle.x = Math.random() * canvas.width
          particle.opacity = 0
        }

        ctx.globalAlpha = particle.opacity
        const redIntensity = 200 + Math.floor(particle.depth * 55)
        ctx.fillStyle = `rgba(${redIntensity}, 10, 30, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        if (particle.depth > 0.4) {
          // Glow
          ctx.shadowBlur = 12 * particle.depth
          ctx.shadowColor = `rgba(255, 50, 80, ${particle.opacity * 0.6})`
          ctx.fillStyle = `rgba(${redIntensity + 40}, 30, 50, ${particle.opacity * 0.5})`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
          ctx.fill()

          // Trail effect
          ctx.shadowBlur = 6 * particle.depth
          ctx.shadowColor = `rgba(200, 30, 60, ${particle.opacity * 0.3})`
          ctx.fillStyle = `rgba(${redIntensity + 20}, 15, 40, ${particle.opacity * 0.3})`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y - particle.speedY * 2, particle.size * 1.2, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
