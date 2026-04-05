import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypingAnimationProps {
  text: string
  duration?: number
  className?: string
  cursorClassName?: string
}

export function TypingAnimation({
  text,
  duration = 50,
  className,
  cursorClassName,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayedText("")
    setIsComplete(false)
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1))
        i++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, duration)
    return () => clearInterval(interval)
  }, [text, duration])

  return (
    <span className={cn("inline-flex items-center", className)}>
      {displayedText}
      {!isComplete && (
        <span
          className={cn(
            "ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-current",
            cursorClassName
          )}
        />
      )}
    </span>
  )
}
