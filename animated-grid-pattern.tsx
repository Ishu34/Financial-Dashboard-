import { useCallback, useEffect, useId, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedGridPatternProps {
  width?: number
  height?: number
  x?: number
  y?: number
  strokeDasharray?: number
  numSquares?: number
  maxOpacity?: number
  duration?: number
  className?: string
}

function getRandomPos(max: number) {
  return Math.floor(Math.random() * max)
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  maxOpacity = 0.5,
  duration = 4,
  className,
  ...props
}: AnimatedGridPatternProps & React.SVGProps<SVGSVGElement>) {
  const id = useId()
  const containerRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [squares, setSquares] = useState<Array<{ id: number; pos: [number, number] }>>([])

  const getMaxGrid = useCallback(() => {
    return {
      horizontal: Math.ceil(dimensions.width / width) + 1,
      vertical: Math.ceil(dimensions.height / height) + 1,
    }
  }, [dimensions, width, height])

  const generateSquares = useCallback(
    (count: number) => {
      const max = getMaxGrid()
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        pos: [getRandomPos(max.horizontal), getRandomPos(max.vertical)] as [number, number],
      }))
    },
    [getMaxGrid]
  )

  const updateSquarePosition = useCallback(
    (id: number) => {
      const max = getMaxGrid()
      setSquares((prev) =>
        prev.map((sq) =>
          sq.id === id
            ? { ...sq, pos: [getRandomPos(max.horizontal), getRandomPos(max.vertical)] as [number, number] }
            : sq
        )
      )
    },
    [getMaxGrid]
  )

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares))
    }
  }, [dimensions, numSquares, generateSquares])

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [col, row], id: sqId }, index) => (
          <rect
            key={`${sqId}-${index}`}
            width={width - 1}
            height={height - 1}
            x={col * width + 1}
            y={row * height + 1}
            fill="currentColor"
            strokeWidth="0"
            style={{
              opacity: 0,
              animation: `fadeInOut ${duration}s ease-in-out ${Math.random() * duration}s infinite`,
            }}
            onAnimationEnd={() => updateSquarePosition(sqId)}
          />
        ))}
      </svg>
      <style>{`@keyframes fadeInOut { 0%, 100% { opacity: 0; } 50% { opacity: ${maxOpacity}; } }`}</style>
    </svg>
  )
}
