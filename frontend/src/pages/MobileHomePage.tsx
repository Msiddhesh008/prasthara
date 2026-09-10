import { Link } from 'react-router-dom'
// import { motion, useReducedMotion } from 'framer-motion'
import { ProductCard } from '../components/ProductCard'
import {
  //  MESSAGES, 
  ROUTES } from '../constants'
import { useFeaturedProducts } from '../hooks/useProducts'
// import logoHero from '../assets/logo-hero.png'

// const BANNER_IMAGE =
//   'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=1200&q=80'

export function MobileHomePage() {
  const { products, loading } = useFeaturedProducts()
  // const reduceMotion = useReducedMotion()

  return (
    <div className="page-home-mobile">
      {/* <section className="mobile-banner">
        <div className="mobile-banner__media">
          <img src={BANNER_IMAGE} alt="" className="mobile-banner__image" />
          <div className="mobile-banner__veil" />
        </div>
        <div className="mobile-banner__content">
          <motion.img
            src={logoHero}
            alt="Prasthara"
            className="mobile-banner__logo"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          />
          <motion.p
            className="mobile-banner__tag"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            {MESSAGES.brandTagline}
          </motion.p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
          >
            <Link to={ROUTES.shop} className="btn btn--primary">
              Shop With Us
            </Link>
          </motion.div>
        </div>
      </section> */}

      <section className="section mobile-featured">
        <div className="section__inner">
          <div className="section__header">
            <p className="eyebrow">Featured</p>
            <h2>Pieces with a textile story</h2>
          </div>
          {loading ? (
            <p className="muted">Loading pieces…</p>
          ) : (
            <div className="product-grid">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
          <div className="section__cta">
            <Link to={ROUTES.shop} className="btn btn--primary">
              View all
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
