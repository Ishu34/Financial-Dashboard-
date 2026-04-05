import { useCallback, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  color?: string
  vx?: number
  vy?: number
}

interface Particle {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
}

export function Particles({
  className,
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const particles = useRef<Particle[]>([])
  const mouse = useRef({ x: 0, y: 0 })
  const canvasSize = useRef({ w: 0, h: 0 })
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : { r: 255, g: 255, b: 255 }
  }

  const rgb = hexToRgb(color)

  const createParticle = useCallback((): Particle => {
    const w = canvasSize.current.w
    const h = canvasSize.current.h
    return {
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h),
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2 + size),
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    }
  }, [size])

  const drawParticle = useCallback(
    (particle: Particle) => {
      if (!context.current) return
      const { x, y, translateX, translateY, size: s, alpha } = particle
      context.current.translate(translateX, translateY)
      context.current.beginPath()
      context.current.arc(x, y, s, 0, 2 * Math.PI)
      context.current.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
      context.current.fill()
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0)
    },
    [rgb, dpr]
  )

  const initCanvas = useCallback(() => {
    if (!canvasContainerRef.current || !canvasRef.current) return
    const container = canvasContainerRef.current
    canvasSize.current.w = container.offsetWidth
    canvasSize.current.h = container.offsetHeight
    const canvas = canvasRef.current
    canvas.width = canvasSize.current.w * dpr
    canvas.height = canvasSize.current.h * dpr
    canvas.style.width = `${canvasSize.current.w}px`
    canvas.style.height = `${canvasSize.current.h}px`
    context.current = canvas.getContext("2d")
    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
  }, [dpr])

  const animate = useCallback(() => {
    if (!context.current) return
    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
    particles.current.forEach((particle, i) => {
      const edge = [
        particle.x + particle.translateX - particle.size,
        canvasSize.current.w - particle.x - particle.translateX - particle.size,
        particle.y + particle.translateY - particle.size,
        canvasSize.current.h - particle.y - particle.translateY - particle.size,
      ]
      const closestEdge = edge.reduce((a, b) => Math.min(a, b))
      const remapClosestEdge = parseFloat(
        Math.min(Math.max(closestEdge / 20, 0), 1).toFixed(2)
      )
      if (remapClosestEdge > 1) {
        particle.alpha += 0.02
        if (particle.alpha > particle.targetAlpha) particle.alpha = particle.targetAlpha
      } else {
        particle.alpha = particle.targetAlpha * remapClosestEdge
      }
      particle.x += particle.dx + vx
      particle.y += particle.dy + vy
      particle.translateX += (mouse.current.x / (staticity / particle.magnetism) - particle.translateX) / ease
      particle.translateY += (mouse.current.y / (staticity / particle.magnetism) - particle.translateY) / ease
      drawParticle(particle)
      if (
        particle.x < -particle.size ||
        particle.x > canvasSize.current.w + particle.size ||
        particle.y < -particle.size ||
        particle.y > canvasSize.current.h + particle.size
      ) {
        particles.current.splice(i, 1)
        const newParticle = createParticle()
        particles.current.push(newParticle)
        drawParticle(newParticle)
      }
    })
    requestAnimationFrame(animate)
  }, [drawParticle, createParticle, ease, staticity, vx, vy])

  useEffect(() => {
    initCanvas()
    particles.current = Array.from({ length: quantity }, createParticle)
    const animationId = requestAnimationFrame(animate)

    const handleResize = () => {
      initCanvas()
      particles.current = Array.from({ length: quantity }, createParticle)
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!canvasContainerRef.current) return
      const rect = canvasContainerRef.current.getBoundingClientRect()
      const { w, h } = canvasSize.current
      const x = e.clientX - rect.left - w / 2
      const y = e.clientY - rect.top - h / 2
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
      if (inside) {
        mouse.current.x = x
        mouse.current.y = y
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("pointermove", handlePointerMove)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [animate, createParticle, initCanvas, quantity])

  return (
    <div ref={canvasContainerRef} className={cn("pointer-events-none", className)} aria-hidden="true">
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}
