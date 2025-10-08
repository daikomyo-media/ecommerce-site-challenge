import { Link } from 'react-router-dom'

import { Container } from './Container'
import { useCart } from '../../store/cartContext'
import { getCartCount } from '../../store/cartSelectors'

const NAV_LINKS = [
  { to: '/products', label: 'Shop All' },
  { to: '/products?latest=true', label: 'Latest Arrivals' },
]

export function Navbar() {
  const { state } = useCart()
  const count = getCartCount(state)
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <Container className="flex items-center justify-between py-4">
        <Link to="/" className="text-lg font-semibold text-slate-900">
          Great Commerce
        </Link>
        <nav>
          <ul className="flex items-center gap-6 text-sm font-medium text-slate-700">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="transition-colors hover:text-slate-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          to="/cart"
          className="relative rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          Cart
          {count > 0 && (
            <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-slate-900 px-1 text-xs font-semibold text-white">
              {count}
            </span>
          )}
        </Link>
      </Container>
    </header>
  )
}
