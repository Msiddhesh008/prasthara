import { Outlet } from 'react-router-dom'
import { useIsDesktop } from '../hooks/useMediaQuery'
import { AppHeader } from './AppHeader'
import { BottomNav } from './BottomNav'
import { CartDrawer } from './CartDrawer'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { SmoothScroll } from './SmoothScroll'

export function Layout() {
  const isDesktop = useIsDesktop()

  return (
    <SmoothScroll>
      {isDesktop ? (
        <div className="app-shell">
          <Navbar />
          <main className="app-main">
            <Outlet />
          </main>
          <Footer />
          <CartDrawer />
        </div>
      ) : (
        <div className="app-shell app-shell--mobile">
          <AppHeader />
          <main className="app-main app-main--mobile">
            <Outlet />
          </main>
          <BottomNav />
          <CartDrawer />
        </div>
      )}
    </SmoothScroll>
  )
}
