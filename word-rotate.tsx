import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface WordRotateProps {
  words: string[]
  duration?: number
  className?: string
}

export function WordRotate({
  words,
  duration = 2500,
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, duration)
    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <div className="overflow-hidden py-1">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={cn("inline-block", className)}
          initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
