import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'
import { LenisContext } from '../hooks/useLenis'

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()
  const { pathname } = useLocation()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduceMotion) {
      setLenis(null)
      return
    }

    const instance = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })
    setLenis(instance)

    let frameId = 0
    const raf = (time: number) => {
      instance.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      instance.destroy()
      setLenis(null)
    }
  }, [reduceMotion])

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, lenis])

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  )
}
