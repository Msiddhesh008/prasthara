export type ProductType = 'thrift' | 'upcycled'

export type Category =
  | 'clothing'
  | 'apron'
  | 'bag'
  | 'pouch'
  | 'home'
  | 'custom'

export type Condition = 'excellent' | 'good' | 'fair'

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name'

export interface Product {
  id: string
  name: string
  slug: string
  type: ProductType
  category: Category
  price: number
  size?: string
  condition?: Condition
  story: string
  images: string[]
  tags: string[]
  isOneOfOne: boolean
  featured?: boolean
}

export interface ProductFilter {
  type?: ProductType | 'all'
  category?: Category | 'all'
  condition?: Condition | 'all'
  priceMin?: number
  priceMax?: number
  sort?: SortOption
}

export interface ShopFilterState {
  type: ProductType | 'all'
  category: Category | 'all'
  condition: Condition | 'all'
  priceMin: number
  priceMax: number
  sort: SortOption
}

export interface CartItem {
  product: Product
  quantity: number
}
