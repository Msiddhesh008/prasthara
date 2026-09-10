import { mockProducts } from '../data/mockProducts'
import type { Product, ProductFilter } from '../types/product'

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms))

export const productService = {
  async getAll(): Promise<Product[]> {
    await delay()
    return [...mockProducts]
  },

  async getBySlug(slug: string): Promise<Product | undefined> {
    await delay()
    return mockProducts.find((product) => product.slug === slug)
  },

  async getFeatured(): Promise<Product[]> {
    await delay()
    return mockProducts.filter((product) => product.featured)
  },

  async filter(filters: ProductFilter): Promise<Product[]> {
    await delay()
    return mockProducts.filter((product) => {
      const typeMatch =
        !filters.type || filters.type === 'all' || product.type === filters.type
      const categoryMatch =
        !filters.category ||
        filters.category === 'all' ||
        product.category === filters.category
      return typeMatch && categoryMatch
    })
  },
}
