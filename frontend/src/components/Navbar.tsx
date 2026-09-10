import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import logo from '../assets/logo-nav.png'
import { ROUTES } from '../constants'
import { useCart } from '../store/CartContext'

const links = [
  { to: ROUTES.home, label: 'Home' },
  { to: ROUTES.shop, label: 'Shop' },
  { to: ROUTES.story, label: 'Our Story' },
  { to: ROUTES.donate, label: 'Donate' },
  { to: ROUTES.contact, label: 'Contact' },
]

const desktopLinks = links.filter((link) => link.to !== ROUTES.home)

export function Navbar() {
  const { itemCount, openCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const mobileMenu = (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          id="mobile-menu"
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <nav className="mobile-menu__nav" aria-label="Mobile">
            {links.map((link, index) => (
              <motion.div
                key={link.to}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: reduceMotion ? 0 : 0.08 + index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? 'mobile-menu__link is-active'
                      : 'mobile-menu__link'
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <header className={`site-header${menuOpen ? ' is-menu-open' : ''}`}>
        <div className="site-header__inner">
          <Link
            to={ROUTES.home}
            className="site-logo"
            aria-label="Prasthara home"
            onClick={closeMenu}
          >
            <img src={logo} alt="Prasthara" className="site-logo__img" />
          </Link>

          <nav className="site-nav site-nav--desktop" aria-label="Primary">
            {desktopLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? 'site-nav__link is-active' : 'site-nav__link'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <button type="button" className="cart-trigger" onClick={openCart}>
              Cart
              <span className="cart-trigger__count">{itemCount}</span>
            </button>

            <button
              type="button"
              className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="menu-toggle__bar" />
              <span className="menu-toggle__bar" />
            </button>
          </div>
        </div>
      </header>

      {createPortal(mobileMenu, document.body)}
    </>
  )
}
