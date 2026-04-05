import React, { useCallback, useState } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number
  gradientFrom?: string
  gradientTo?: string
  gradientColor?: string
  gradientOpacity?: number
  children?: React.ReactNode
}

export function MagicCard({
  gradientSize = 200,
  gradientFrom = "#3B82F6",
  gradientTo = "#8B5CF6",
  gradientColor = "rgba(59, 130, 246, 0.1)",
  gradientOpacity = 0,
  className,
  children,
  ...props
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize)
  const mouseY = useMotionValue(-gradientSize)
  const [opacity, setOpacity] = useState(0)

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )

  const handlePointerEnter = useCallback(() => setOpacity(1), [])
  const handlePointerLeave = useCallback(() => {
    setOpacity(0)
    mouseX.set(-gradientSize)
    mouseY.set(-gradientSize)
  }, [mouseX, mouseY, gradientSize])

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {/* Animated border gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
              ${gradientFrom},
              ${gradientTo},
              transparent 100%
            )
          `,
          opacity,
        }}
      />

      {/* Card background */}
      <div className="absolute inset-px z-10 rounded-[11px] bg-card" />

      {/* Spotlight gradient overlay */}
      <motion.div
        className="pointer-events-none absolute inset-px z-20 rounded-[11px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
              ${gradientColor},
              transparent 100%
            )
          `,
          opacity,
        }}
      />

      {/* Content */}
      <div className="relative z-30">{children}</div>
    </div>
  )
}
