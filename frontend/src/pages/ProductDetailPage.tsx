import { Link, useParams } from 'react-router-dom'
import { useProductBySlug } from '../hooks/useProducts'
import { ROUTES } from '../constants'
import { useCart } from '../store/CartContext'

function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`
}

export function ProductDetailPage() {
  const { slug } = useParams()
  const { product, loading, error } = useProductBySlug(slug)
  const { addItem } = useCart()

  if (loading) {
    return (
      <div className="section">
        <div className="section__inner">
          <p className="muted">Loading piece…</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="section">
        <div className="section__inner">
          <p className="error-text">{error ?? 'Product not found.'}</p>
          <Link to={ROUTES.shop} className="btn btn--primary">
            Back to shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-product section">
      <div className="section__inner product-detail">
        <div className="product-detail__gallery">
          <img src={product.images[0]} alt={product.name} />
        </div>
        <div className="product-detail__info">
          <p className="eyebrow">{product.type}</p>
          <h1>{product.name}</h1>
          <p className="product-detail__price">{formatPrice(product.price)}</p>
          {product.size && (
            <p className="product-detail__meta">Size: {product.size}</p>
          )}
          {product.condition && (
            <p className="product-detail__meta">
              Condition: {product.condition}
            </p>
          )}
          {product.isOneOfOne && (
            <p className="product-detail__one">One of one</p>
          )}
          <p className="product-detail__story">{product.story}</p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => addItem(product)}
          >
            Add to cart
          </button>
          <Link to={ROUTES.shop} className="text-link">
            ← Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
