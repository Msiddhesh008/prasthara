import { useEffect, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()
  const { pathname } = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (reduceMotion) {
      lenisRef.current = null
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    let frameId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduceMotion])

  useEffect(() => {
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname])

  return <>{children}</>
}
