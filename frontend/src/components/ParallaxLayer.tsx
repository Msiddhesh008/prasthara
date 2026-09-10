import { useReducedMotion, useScroll, useTransform, motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ParallaxLayerProps {
  children?: ReactNode
  speed?: number
  className?: string
}

export function ParallaxLayer({
  children,
  speed = 0.25,
  className = '',
}: ParallaxLayerProps) {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 600 * speed])

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}
