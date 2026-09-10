import { useEffect, useState } from 'react'
import { useImageZoom } from '../hooks/useImageZoom'

interface ProductImageGalleryProps {
  images: string[]
  alt: string
}

function useCanHoverZoom(): boolean {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const widthQuery = window.matchMedia('(min-width: 900px)')
    const sync = () => setEnabled(hoverQuery.matches && widthQuery.matches)
    sync()
    hoverQuery.addEventListener('change', sync)
    widthQuery.addEventListener('change', sync)
    return () => {
      hoverQuery.removeEventListener('change', sync)
      widthQuery.removeEventListener('change', sync)
    }
  }, [])

  return enabled
}

export function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const gallery = images.length > 0 ? images : []
  const [activeIndex, setActiveIndex] = useState(0)
  const canZoom = useCanHoverZoom()
  const {
    frameRef,
    zoom,
    lensSize,
    zoomFactor,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
  } = useImageZoom(canZoom)

  useEffect(() => {
    setActiveIndex(0)
  }, [images])

  const activeImage = gallery[activeIndex] ?? gallery[0]

  if (!activeImage) {
    return null
  }

  return (
    <div className="product-gallery">
      {gallery.length > 1 && (
        <div
          className="product-gallery__thumbs"
          role="tablist"
          aria-label="Product images"
        >
          {gallery.map((src, index) => {
            const selected = index === activeIndex
            return (
              <button
                key={`${src}-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                className={
                  selected
                    ? 'product-gallery__thumb is-active'
                    : 'product-gallery__thumb'
                }
                onClick={() => setActiveIndex(index)}
              >
                <img src={src} alt="" />
              </button>
            )
          })}
        </div>
      )}

      <div className="product-gallery__stage">
        <div
          ref={frameRef}
          className={`product-gallery__frame${zoom.active ? ' is-zooming' : ''}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
        >
          <img
            src={activeImage}
            alt={alt}
            className="product-gallery__image"
          />
          {zoom.active && (
            <span
              className="product-gallery__lens"
              style={{
                width: lensSize,
                height: lensSize,
                transform: `translate(${zoom.lensLeft}px, ${zoom.lensTop}px)`,
              }}
              aria-hidden
            />
          )}
        </div>

        {zoom.active && (
          <div
            className="product-gallery__zoom"
            style={{
              backgroundImage: `url(${activeImage})`,
              backgroundSize: `${zoomFactor * 100}%`,
              backgroundPosition: `${zoom.bgPosX}% ${zoom.bgPosY}%`,
            }}
            aria-hidden
          />
        )}
      </div>
    </div>
  )
}
