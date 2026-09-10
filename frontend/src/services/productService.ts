import { mockProducts } from '../data/mockProducts'
import type { Product, ProductFilter, SortOption } from '../types/product'

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms))

function sortProducts(products: Product[], sort: SortOption = 'featured'): Product[] {
  const next = [...products]

  switch (sort) {
    case 'price-asc':
      return next.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return next.sort((a, b) => b.price - a.price)
    case 'name':
      return next.sort((a, b) => a.name.localeCompare(b.name))
    case 'featured':
    default:
      return next.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
  }
}

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

    const filtered = mockProducts.filter((product) => {
      const typeMatch =
        !filters.type || filters.type === 'all' || product.type === filters.type
      const categoryMatch =
        !filters.category ||
        filters.category === 'all' ||
        product.category === filters.category
      const conditionMatch =
        !filters.condition ||
        filters.condition === 'all' ||
        product.condition === filters.condition
      const minMatch =
        filters.priceMin === undefined || product.price >= filters.priceMin
      const maxMatch =
        filters.priceMax === undefined || product.price <= filters.priceMax

      return (
        typeMatch &&
        categoryMatch &&
        conditionMatch &&
        minMatch &&
        maxMatch
      )
    })

    return sortProducts(filtered, filters.sort)
  },
}
