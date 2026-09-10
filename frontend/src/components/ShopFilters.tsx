import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { ShopFilterState } from '../types/product'
import { FilterPanel } from './FilterPanel'

export type { ShopFilterState }

interface ShopFiltersProps {
  filters: ShopFilterState
  open: boolean
  onOpenChange: (open: boolean) => void
  onChange: (next: Partial<ShopFilterState>) => void
  onReset: () => void
  hasActiveFilters: boolean
}

export function ShopFilters({
  filters,
  open,
  onOpenChange,
  onChange,
  onReset,
  hasActiveFilters,
}: ShopFiltersProps) {
  useEffect(() => {
    if (!open) return undefined
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const drawer =
    open &&
    createPortal(
      <div
        className="filter-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <button
          type="button"
          className="filter-drawer__backdrop"
          aria-label="Close filters"
          onClick={() => onOpenChange(false)}
        />
        <aside className="filter-drawer__sheet">
          <FilterPanel
            filters={filters}
            onChange={onChange}
            onReset={onReset}
            hasActiveFilters={hasActiveFilters}
            onClose={() => onOpenChange(false)}
          />
          <div className="filter-drawer__footer">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => onOpenChange(false)}
            >
              Show results
            </button>
          </div>
        </aside>
      </div>,
      document.body,
    )

  return (
    <>
      <aside className="filter-sidebar" aria-label="Product filters">
        <FilterPanel
          filters={filters}
          onChange={onChange}
          onReset={onReset}
          hasActiveFilters={hasActiveFilters}
        />
      </aside>
      {drawer}
    </>
  )
}
