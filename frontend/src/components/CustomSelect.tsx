import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'

export interface SelectOption<T extends string = string> {
  value: T
  label: string
}

interface CustomSelectProps<T extends string> {
  id?: string
  label?: string
  hint?: string
  value: T
  options: SelectOption<T>[]
  onChange: (value: T) => void
  className?: string
  align?: 'left' | 'right'
  variant?: 'default' | 'panel'
}

export function CustomSelect<T extends string>({
  id,
  label,
  hint,
  value,
  options,
  onChange,
  className = '',
  align = 'left',
  variant = 'default',
}: CustomSelectProps<T>) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const listboxId = `${selectId}-listbox`
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const selected = options.find((option) => option.value === value) ?? options[0]
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  )

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open])

  useEffect(() => {
    if (open) setActiveIndex(selectedIndex)
  }, [open, selectedIndex])

  const selectValue = (next: T) => {
    onChange(next)
    setOpen(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') {
      setOpen(false)
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) {
        setOpen(true)
        return
      }

      const delta = event.key === 'ArrowDown' ? 1 : -1
      setActiveIndex((current) => {
        const next = (current + delta + options.length) % options.length
        return next
      })
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (!open) {
        setOpen(true)
        return
      }
      const option = options[activeIndex]
      if (option) selectValue(option.value)
    }
  }

  const rootClass = [
    'custom-select',
    open ? 'is-open' : '',
    align === 'right' ? 'custom-select--right' : '',
    variant === 'panel' ? 'custom-select--panel' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClass} ref={rootRef}>
      {label && (
        <span className="custom-select__label" id={`${selectId}-label`}>
          {label}
        </span>
      )}
      <button
        type="button"
        id={selectId}
        className="custom-select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={label ? `${selectId}-label ${selectId}` : undefined}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
      >
        <span className="custom-select__copy">
          {hint && <span className="custom-select__hint">{hint}</span>}
          <span className="custom-select__value">{selected?.label}</span>
        </span>
        <span className="custom-select__chevron" aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <ul
          id={listboxId}
          className="custom-select__menu"
          role="listbox"
          aria-labelledby={label ? `${selectId}-label` : selectId}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value
            const isActive = index === activeIndex
            return (
              <li key={option.value} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    'custom-select__option',
                    isSelected ? 'is-selected' : '',
                    isActive ? 'is-active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectValue(option.value)}
                >
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
