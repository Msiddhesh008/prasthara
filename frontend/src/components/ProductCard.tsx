import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Product } from '../types/product'
import { ROUTES } from '../constants'

interface ProductCardProps {
  product: Product
  index?: number
}

function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <Link to={ROUTES.product(product.slug)} className="product-card__link">
        <div className="product-card__media">
          <img src={product.images[0]} alt={product.name} loading="lazy" />
          <span className="product-card__badge">{product.type}</span>
        </div>
        <div className="product-card__body">
          <h3 className="product-card__title">{product.name}</h3>
          <p className="product-card__price">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.article>
  )
}
