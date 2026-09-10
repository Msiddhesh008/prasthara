import { useCallback, useRef, useState, type MouseEvent, type RefObject } from 'react'

export interface ImageZoomState {
  active: boolean
  lensLeft: number
  lensTop: number
  bgPosX: number
  bgPosY: number
}

const LENS_RATIO = 0.38
const ZOOM_FACTOR = 2.4

const idleState: ImageZoomState = {
  active: false,
  lensLeft: 0,
  lensTop: 0,
  bgPosX: 0,
  bgPosY: 0,
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function useImageZoom(enabled: boolean): {
  frameRef: RefObject<HTMLDivElement | null>
  zoom: ImageZoomState
  lensSize: number
  zoomFactor: number
  onMouseEnter: () => void
  onMouseLeave: () => void
  onMouseMove: (event: MouseEvent<HTMLDivElement>) => void
} {
  const frameRef = useRef<HTMLDivElement | null>(null)
  const [zoom, setZoom] = useState<ImageZoomState>(idleState)
  const [lensSize, setLensSize] = useState(120)

  const onMouseEnter = useCallback(() => {
    if (!enabled) return
    setZoom((prev) => ({ ...prev, active: true }))
  }, [enabled])

  const onMouseLeave = useCallback(() => {
    setZoom(idleState)
  }, [])

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!enabled || !frameRef.current) return

      const rect = frameRef.current.getBoundingClientRect()
      const size = Math.min(rect.width, rect.height) * LENS_RATIO
      const maxX = rect.width - size
      const maxY = rect.height - size
      const nextLeft = clamp(event.clientX - rect.left - size / 2, 0, maxX)
      const nextTop = clamp(event.clientY - rect.top - size / 2, 0, maxY)

      setLensSize(size)
      setZoom({
        active: true,
        lensLeft: nextLeft,
        lensTop: nextTop,
        bgPosX: maxX > 0 ? (nextLeft / maxX) * 100 : 0,
        bgPosY: maxY > 0 ? (nextTop / maxY) * 100 : 0,
      })
    },
    [enabled],
  )

  return {
    frameRef,
    zoom,
    lensSize,
    zoomFactor: ZOOM_FACTOR,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
  }
}
