import { useEffect, useState } from 'react'
import { productService } from '../services/productService'
import type { Product, ProductFilter } from '../types/product'

export function useProducts(filters?: ProductFilter) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    const load = filters
      ? productService.filter(filters)
      : productService.getAll()

    load
      .then((data) => {
        if (active) setProducts(data)
      })
      .catch(() => {
        if (active) setError('Unable to load products.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [
    filters?.type,
    filters?.category,
    filters?.condition,
    filters?.priceMin,
    filters?.priceMax,
    filters?.sort,
  ])

  return { products, loading, error }
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    productService
      .getFeatured()
      .then((data) => {
        if (active) setProducts(data)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return { products, loading }
}

export function useProductBySlug(slug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setProduct(null)
      setLoading(false)
      return
    }

    let active = true
    setLoading(true)
    productService
      .getBySlug(slug)
      .then((data) => {
        if (!active) return
        if (!data) {
          setError('Product not found.')
          setProduct(null)
          return
        }
        setProduct(data)
        setError(null)
      })
      .catch(() => {
        if (active) setError('Unable to load product.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [slug])

  return { product, loading, error }
}
