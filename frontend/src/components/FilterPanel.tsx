import { useId, type CSSProperties } from 'react'
import {
  CATEGORIES,
  CONDITIONS,
  PRICE_BOUNDS,
  PRODUCT_TYPES,
} from '../data/mockCategories'
import type { ShopFilterState } from '../types/product'

interface FilterPanelProps {
  filters: ShopFilterState
  onChange: (next: Partial<ShopFilterState>) => void
  onReset: () => void
  hasActiveFilters: boolean
  onClose?: () => void
}

function formatPrice(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`
}

export function FilterPanel({
  filters,
  onChange,
  onReset,
  hasActiveFilters,
  onClose,
}: FilterPanelProps) {
  const typeName = useId()
  const categoryName = useId()
  const conditionName = useId()

  const rangePercent = {
    left:
      ((filters.priceMin - PRICE_BOUNDS.min) /
        (PRICE_BOUNDS.max - PRICE_BOUNDS.min)) *
      100,
    right:
      ((filters.priceMax - PRICE_BOUNDS.min) /
        (PRICE_BOUNDS.max - PRICE_BOUNDS.min)) *
      100,
  }

  const handleMinChange = (value: number) => {
    onChange({ priceMin: Math.min(value, filters.priceMax - PRICE_BOUNDS.step) })
  }

  const handleMaxChange = (value: number) => {
    onChange({ priceMax: Math.max(value, filters.priceMin + PRICE_BOUNDS.step) })
  }

  return (
    <div className="filter-sidebar__panel">
      <div className="filter-sidebar__head">
        <h2 className="filter-sidebar__title">Filters</h2>
        <div className="filter-sidebar__head-actions">
          {hasActiveFilters && (
            <button type="button" className="filter-clear" onClick={onReset}>
              Clear
            </button>
          )}
          {onClose && (
            <button
              type="button"
              className="filter-sidebar__close"
              aria-label="Close filters"
              onClick={onClose}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <section className="filter-section">
        <h3 className="filter-section__title">Type</h3>
        <div className="filter-options" role="radiogroup" aria-label="Type">
          {PRODUCT_TYPES.map((option) => (
            <label key={option.value} className="filter-option">
              <input
                type="radio"
                name={typeName}
                checked={filters.type === option.value}
                onChange={() => onChange({ type: option.value })}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="filter-section">
        <h3 className="filter-section__title">Category</h3>
        <div className="filter-options" role="radiogroup" aria-label="Category">
          {CATEGORIES.map((option) => (
            <label key={option.value} className="filter-option">
              <input
                type="radio"
                name={categoryName}
                checked={filters.category === option.value}
                onChange={() => onChange({ category: option.value })}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="filter-section">
        <h3 className="filter-section__title">Price</h3>
        <p className="filter-price__values">
          {formatPrice(filters.priceMin)} – {formatPrice(filters.priceMax)}
        </p>
        <div
          className="filter-price"
          style={
            {
              '--range-left': `${rangePercent.left}%`,
              '--range-right': `${rangePercent.right}%`,
            } as CSSProperties
          }
        >
          <input
            type="range"
            className="filter-price__input"
            min={PRICE_BOUNDS.min}
            max={PRICE_BOUNDS.max}
            step={PRICE_BOUNDS.step}
            value={filters.priceMin}
            aria-label="Minimum price"
            onChange={(event) => handleMinChange(Number(event.target.value))}
          />
          <input
            type="range"
            className="filter-price__input"
            min={PRICE_BOUNDS.min}
            max={PRICE_BOUNDS.max}
            step={PRICE_BOUNDS.step}
            value={filters.priceMax}
            aria-label="Maximum price"
            onChange={(event) => handleMaxChange(Number(event.target.value))}
          />
        </div>
      </section>

      <section className="filter-section">
        <h3 className="filter-section__title">Condition</h3>
        <div className="filter-options" role="radiogroup" aria-label="Condition">
          {CONDITIONS.map((option) => (
            <label key={option.value} className="filter-option">
              <input
                type="radio"
                name={conditionName}
                checked={filters.condition === option.value}
                onChange={() => onChange({ condition: option.value })}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </section>
    </div>
  )
}
