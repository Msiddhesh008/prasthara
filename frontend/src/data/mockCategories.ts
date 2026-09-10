import type { Category, ProductType } from '../types/product'

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
