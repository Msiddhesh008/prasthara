import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { NAV_LINKS, ROUTES } from '../constants'
import { useScrollDirection } from '../hooks/useScrollDirection'

function NavIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="bottom-nav__svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  )
}

const ICONS: Record<string, ReactNode> = {
  [ROUTES.home]: (
    <NavIcon>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.5Z" />
    </NavIcon>
  ),
  [ROUTES.shop]: (
    <NavIcon>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </NavIcon>
  ),
  [ROUTES.story]: (
    <NavIcon>
      <path d="M5 4.5h10.5A3.5 3.5 0 0 1 19 8v11.5H8.5A3.5 3.5 0 0 0 5 23" />
      <path d="M5 4.5V23" />
      <path d="M9 9h6.5M9 13h6.5" />
    </NavIcon>
  ),
  [ROUTES.donate]: (
    <NavIcon>
      <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
    </NavIcon>
  ),
  [ROUTES.contact]: (
    <NavIcon>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4.5 7.5 7.5 6 7.5-6" />
    </NavIcon>
  ),
}

export function BottomNav() {
  const direction = useScrollDirection()
  const reduceMotion = useReducedMotion()
  const hidden = direction === 'down'

  return (
    <motion.nav
      className="bottom-nav"
      aria-label="Primary"
      initial={false}
      animate={{ y: hidden ? '110%' : '0%' }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 380, damping: 36, mass: 0.7 }
      }
    >
      <div className="bottom-nav__inner">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === ROUTES.home}
            className={({ isActive }) =>
              isActive ? 'bottom-nav__item is-active' : 'bottom-nav__item'
            }
          >
            <span className="bottom-nav__icon">{ICONS[link.to]}</span>
            <span className="bottom-nav__label">{link.label}</span>
          </NavLink>
        ))}
      </div>
    </motion.nav>
  )
}
