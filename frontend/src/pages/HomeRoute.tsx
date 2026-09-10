import { useIsDesktop } from '../hooks/useMediaQuery'
import { HomePage } from './HomePage'
import { MobileHomePage } from './MobileHomePage'

export function HomeRoute() {
  const isDesktop = useIsDesktop()
  return isDesktop ? <HomePage /> : <MobileHomePage />
}
