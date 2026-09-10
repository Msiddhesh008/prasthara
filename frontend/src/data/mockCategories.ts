import type { Category, Condition, ProductType, SortOption } from '../types/product'

export const PRODUCT_TYPES: { value: ProductType | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'thrift', label: 'Thrift' },
  { value: 'upcycled', label: 'Upcycled' },
]

export const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All categories' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'apron', label: 'Aprons' },
  { value: 'bag', label: 'Bags' },
  { value: 'pouch', label: 'Pouches' },
  { value: 'home', label: 'Home' },
  { value: 'custom', label: 'Custom' },
]

export const CONDITIONS: { value: Condition | 'all'; label: string }[] = [
  { value: 'all', label: 'Any condition' },
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
]

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name A–Z' },
]

export const PRICE_BOUNDS = {
  min: 300,
  max: 2000,
  step: 50,
} as const
