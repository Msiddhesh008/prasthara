import { useEffect, useState } from 'react'
import { useLenis } from './useLenis'

const TOP_THRESHOLD = 24
const DELTA_THRESHOLD = 8

export function useScrollDirection(): 'up' | 'down' {
  const lenis = useLenis()
  const [direction, setDirection] = useState<'up' | 'down'>('up')

  useEffect(() => {
    let lastY = window.scrollY

    const update = (y: number) => {
      if (y <= TOP_THRESHOLD) {
        setDirection('up')
        lastY = y
        return
      }

      const delta = y - lastY
      if (Math.abs(delta) < DELTA_THRESHOLD) return

      setDirection(delta > 0 ? 'down' : 'up')
      lastY = y
    }

    if (lenis) {
      const onScroll = () => update(lenis.scroll)
      const unsubscribe = lenis.on('scroll', onScroll)
      update(lenis.scroll)
      return () => {
        if (typeof unsubscribe === 'function') unsubscribe()
      }
    }

    const onWindowScroll = () => update(window.scrollY)
    window.addEventListener('scroll', onWindowScroll, { passive: true })
    update(window.scrollY)
    return () => window.removeEventListener('scroll', onWindowScroll)
  }, [lenis])

  return direction
}
