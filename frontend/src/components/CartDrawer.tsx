import { AnimatePresence, motion } from 'framer-motion'
import { MESSAGES } from '../constants'
import { useCart } from '../store/CartContext'

function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`
}

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
  } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            className="cart-overlay"
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          >
            <div className="cart-drawer__header">
              <h2>Your cart</h2>
              <button type="button" className="text-button" onClick={closeCart}>
                Close
              </button>
            </div>

            {items.length === 0 ? (
              <p className="cart-drawer__empty">{MESSAGES.cartEmpty}</p>
            ) : (
              <ul className="cart-drawer__list">
                {items.map((item) => (
                  <li key={item.product.id} className="cart-drawer__item">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="cart-drawer__thumb"
                    />
                    <div className="cart-drawer__meta">
                      <p className="cart-drawer__name">{item.product.name}</p>
                      <p className="cart-drawer__price">
                        {formatPrice(item.product.price)}
                      </p>
                      <div className="cart-drawer__qty">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-button"
                        onClick={() => removeItem(item.product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="cart-drawer__footer">
              <div className="cart-drawer__subtotal">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <button type="button" className="btn btn--primary" disabled>
                {MESSAGES.checkoutSoon}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
