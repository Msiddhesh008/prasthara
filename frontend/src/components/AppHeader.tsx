import { Link } from 'react-router-dom'
import logo from '../assets/logo-nav.png'
import { ROUTES } from '../constants'
import { useCart } from '../store/CartContext'

export function AppHeader() {
  const { itemCount, openCart } = useCart()

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link to={ROUTES.home} className="app-header__logo" aria-label="Prasthara home">
          <img src={logo} alt="Prasthara" className="app-header__logo-img" />
        </Link>

        <button type="button" className="cart-trigger" onClick={openCart}>
          Cart
          <span className="cart-trigger__count">{itemCount}</span>
        </button>
      </div>
    </header>
  )
}
