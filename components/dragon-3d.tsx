"use client"

import { useEffect, useRef } from "react"

export function Dragon3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationFrameId: number

    const canvas = document.createElement("canvas")
    const rect = containerRef.current?.getBoundingClientRect()
    canvas.width = rect?.width || 300
    canvas.height = rect?.height || 300

    containerRef.current?.appendChild(canvas)
    const ctx = canvas.getContext("2d")!

    let rotation = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()

      rotation += 1
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate((rotation * Math.PI) / 180)

      // Dragon head
      ctx.fillStyle = "#DC143C"
      ctx.beginPath()
      ctx.arc(0, 0, 40, 0, Math.PI * 2)
      ctx.fill()

      // Dragon horns
      ctx.strokeStyle = "#8B0000"
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(-20, -35)
      ctx.lineTo(-35, -55)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(20, -35)
      ctx.lineTo(35, -55)
      ctx.stroke()

      // Dragon eyes
      ctx.fillStyle = "#FFD700"
      ctx.beginPath()
      ctx.arc(-15, -10, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(15, -10, 6, 0, Math.PI * 2)
      ctx.fill()

      // Dragon pupils
      ctx.fillStyle = "#000000"
      ctx.beginPath()
      ctx.arc(-15, -10, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(15, -10, 3, 0, Math.PI * 2)
      ctx.fill()

      // Dragon jaw
      ctx.strokeStyle = "#DC143C"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(0, 20, 25, 0, Math.PI)
      ctx.stroke()

      // Dragon neck
      ctx.strokeStyle = "#DC143C"
      ctx.lineWidth = 8
      ctx.beginPath()
      ctx.moveTo(-10, 40)
      ctx.bezierCurveTo(-25, 80, -20, 120, -30, 150)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(10, 40)
      ctx.bezierCurveTo(25, 80, 20, 120, 30, 150)
      ctx.stroke()

      // Dragon body
      ctx.fillStyle = "#DC143C"
      ctx.beginPath()
      ctx.ellipse(0, 200, 50, 80, 0, 0, Math.PI * 2)
      ctx.fill()

      // Dragon wings
      ctx.fillStyle = "#8B0000"
      ctx.globalAlpha = 0.8
      ctx.beginPath()
      ctx.ellipse(-80, 150, 60, 40, -0.3, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(80, 150, 60, 40, 0.3, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1

      // Dragon tail
      ctx.strokeStyle = "#DC143C"
      ctx.lineWidth = 10
      ctx.beginPath()
      ctx.moveTo(0, 280)
      ctx.bezierCurveTo(50, 350, 100, 380, 80, 450)
      ctx.stroke()

      // Fire breath effect
      ctx.fillStyle = "rgba(255, 165, 0, 0.6)"
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.arc(-20 + Math.sin(rotation * 0.05 + i) * 20, -30 - i * 15, 15 - i * 2, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      canvas.remove()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
