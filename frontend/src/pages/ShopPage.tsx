import { useMemo, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { CATEGORIES, PRODUCT_TYPES } from '../data/mockCategories'
import { useProducts } from '../hooks/useProducts'
import type { Category, ProductType } from '../types/product'

export function ShopPage() {
  const [type, setType] = useState<ProductType | 'all'>('all')
  const [category, setCategory] = useState<Category | 'all'>('all')

  const filters = useMemo(() => ({ type, category }), [type, category])
  const { products, loading, error } = useProducts(filters)

  return (
    <div className="page-shop section">
      <div className="section__inner">
        <div className="section__header">
          <p className="eyebrow">Shop</p>
          <h1>Thrifted & upcycled</h1>
          <p className="section__lead">
            Every piece extends the life of textiles that already exist.
          </p>
        </div>

        <div className="shop-filters" role="group" aria-label="Product filters">
          <div className="filter-group">
            <span className="filter-group__label">Type</span>
            <div className="filter-chips">
              {PRODUCT_TYPES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={
                    type === option.value
                      ? 'filter-chip is-active'
                      : 'filter-chip'
                  }
                  onClick={() => setType(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-group__label" htmlFor="category-filter">
              Category
            </label>
            <select
              id="category-filter"
              className="filter-select"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as Category | 'all')
              }
            >
              {CATEGORIES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && <p className="muted">Loading pieces…</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="muted">No pieces match these filters.</p>
        )}
        {!loading && products.length > 0 && (
          <div className="product-grid">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
