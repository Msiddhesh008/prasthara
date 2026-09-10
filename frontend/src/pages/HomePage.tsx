import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ParallaxLayer } from '../components/ParallaxLayer'
import { ProductCard } from '../components/ProductCard'
import { MESSAGES, ROUTES } from '../constants'
import { useFeaturedProducts } from '../hooks/useProducts'
import logoHero from '../assets/logo-hero.png'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=1600&q=80'

export function HomePage() {
  const { products, loading } = useFeaturedProducts()
  const reduceMotion = useReducedMotion()

  return (
    <div className="page-home">
      <section className="hero">
        <ParallaxLayer speed={0.35} className="hero__media">
          <img src={HERO_IMAGE} alt="" className="hero__image" />
          <div className="hero__veil" />
        </ParallaxLayer>

        <div className="hero__content">
          <motion.img
            src={logoHero}
            alt="Prasthara"
            className="hero__logo"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.h1
            className="hero__headline"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {MESSAGES.brandTagline}
          </motion.h1>
          <motion.p
            className="hero__support"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {MESSAGES.brandSupport}
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link to={ROUTES.shop} className="btn btn--primary">
              Shop With Us
            </Link>
            <Link to={ROUTES.donate} className="btn btn--ghost">
              Donate Clothes
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="pillars section">
        <div className="section__inner pillars__grid">
          <motion.div
            className="pillar"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="eyebrow">Textile thrifting</p>
            <h2>Clothes find new homes</h2>
            <p>
              We curate and sell pre-loved clothing, helping garments continue
              their journey instead of ending as waste.
            </p>
          </motion.div>
          <motion.div
            className="pillar"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <p className="eyebrow">Textile upcycling</p>
            <h2>Discarded fabric, remade</h2>
            <p>
              Damaged and leftover textiles become handmade aprons, bags,
              pouches, and home pieces — each one unique.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section featured">
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

      <section className="section closing-cta">
        <div className="section__inner closing-cta__inner">
          <h2>Join the journey</h2>
          <p>
            At Prasthara, we believe sustainability begins with reimagining what
            already exists.
          </p>
          <Link to={ROUTES.story} className="btn btn--ghost">
            Read our story
          </Link>
        </div>
      </section>
    </div>
  )
}
