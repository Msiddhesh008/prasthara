import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ROUTES } from './constants'
import { ContactPage } from './pages/ContactPage'
import { DonatePage } from './pages/DonatePage'
import { HomePage } from './pages/HomePage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { ShopPage } from './pages/ShopPage'
import { StoryPage } from './pages/StoryPage'
import { CartProvider } from './store/CartContext'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.shop} element={<ShopPage />} />
            <Route path="/shop/:slug" element={<ProductDetailPage />} />
            <Route path={ROUTES.story} element={<StoryPage />} />
            <Route path={ROUTES.donate} element={<DonatePage />} />
            <Route path={ROUTES.contact} element={<ContactPage />} />
            <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
