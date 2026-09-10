import { useMemo, useState } from 'react'
import { CustomSelect } from '../components/CustomSelect'
import { ProductCard } from '../components/ProductCard'
import {
  ShopFilters,
  type ShopFilterState,
} from '../components/ShopFilters'
import { PRICE_BOUNDS, SORT_OPTIONS } from '../data/mockCategories'
import { useProducts } from '../hooks/useProducts'
import type { SortOption } from '../types/product'

const DEFAULT_FILTERS: ShopFilterState = {
  type: 'all',
  category: 'all',
  condition: 'all',
  priceMin: PRICE_BOUNDS.min,
  priceMax: PRICE_BOUNDS.max,
  sort: 'featured',
}

function hasActiveFilters(filters: ShopFilterState): boolean {
  return (
    filters.type !== 'all' ||
    filters.category !== 'all' ||
    filters.condition !== 'all' ||
    filters.priceMin > PRICE_BOUNDS.min ||
    filters.priceMax < PRICE_BOUNDS.max
  )
}

export function ShopPage() {
  const [filters, setFilters] = useState<ShopFilterState>(DEFAULT_FILTERS)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const query = useMemo(
    () => ({
      type: filters.type,
      category: filters.category,
      condition: filters.condition,
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      sort: filters.sort,
    }),
    [filters],
  )

  const { products, loading, error } = useProducts(query)
  const active = hasActiveFilters(filters)

  const handleChange = (next: Partial<ShopFilterState>) => {
    setFilters((current) => ({ ...current, ...next }))
  }

  const handleReset = () => {
    setFilters((current) => ({
      ...DEFAULT_FILTERS,
      sort: current.sort,
    }))
  }

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

        <div className="shop-layout">
          <ShopFilters
            filters={filters}
            open={filtersOpen}
            onOpenChange={setFiltersOpen}
            onChange={handleChange}
            onReset={handleReset}
            hasActiveFilters={active}
          />

          <div className="shop-results">
            <div className="shop-results__bar">
              <p className="shop-results__count">
                {loading ? (
                  'Loading…'
                ) : (
                  <>
                    <span className="shop-results__count-num">
                      {products.length}
                    </span>
                    <span className="shop-results__count-label">
                      {products.length === 1 ? 'piece' : 'pieces'}
                    </span>
                  </>
                )}
              </p>

              <div className="shop-results__controls">
                <button
                  type="button"
                  className={
                    active
                      ? 'shop-panel-btn is-active'
                      : 'shop-panel-btn'
                  }
                  onClick={() => setFiltersOpen(true)}
                >
                  <span className="shop-panel-btn__copy">
                    <span className="shop-panel-btn__kicker">Filters</span>
                    <span className="shop-panel-btn__value">
                      {active ? 'Refined' : 'Refine'}
                    </span>
                  </span>
                  <span className="shop-panel-btn__icon" aria-hidden>
                    <span />
                    <span />
                    <span />
                  </span>
                  {active && <span className="shop-panel-btn__pulse" />}
                </button>

                <CustomSelect
                  className="shop-sort"
                  label="Sort"
                  hint="Sort"
                  variant="panel"
                  align="right"
                  value={filters.sort}
                  options={SORT_OPTIONS}
                  onChange={(sort: SortOption) => handleChange({ sort })}
                />
              </div>
            </div>

            {error && <p className="error-text">{error}</p>}
            {!loading && !error && products.length === 0 && (
              <p className="muted">No pieces match these filters.</p>
            )}
            {!loading && products.length > 0 && (
              <div className="product-grid">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
