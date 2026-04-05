import { motion, type MotionStyle } from "framer-motion"
import { cn } from "@/lib/utils"

interface BorderBeamProps {
  className?: string
  size?: number
  delay?: number
  duration?: number
  colorFrom?: string
  colorTo?: string
  borderWidth?: number
  reverse?: boolean
  initialOffset?: number
}

export function BorderBeam({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  borderWidth = 1.5,
  reverse = false,
  initialOffset = 0,
}: BorderBeamProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent"
      style={
        {
          "--border-beam-width": `${borderWidth}px`,
          maskImage: "linear-gradient(transparent, transparent), linear-gradient(#000, #000)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
          maskClip: "padding-box, border-box",
        } as React.CSSProperties
      }
    >
      <motion.div
        className={cn("absolute aspect-square", className)}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
          } as MotionStyle
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
        }}
      />
    </div>
  )
}
