import { Link } from 'react-router-dom'

import { Container } from './Container'

const COLLECTION_LINKS = [
  { to: '/products?collection=latest-arrivals', label: 'Latest Arrivals' },
  { to: '/products?collection=seasonal', label: 'Seasonal' },
  { to: '/products?collection=signature', label: 'Signature' },
  { to: '/products?collection=limited', label: 'Limited Edition' },
  { to: '/products?collection=wellness', label: 'Wellness' },
]

const CATEGORY_LINKS = [
  { to: '/products?category=apparel', label: 'Apparel' },
  { to: '/products?category=accessories', label: 'Accessories' },
  { to: '/products?category=home', label: 'Home' },
  { to: '/products?category=tech', label: 'Tech' },
  { to: '/products?category=wellness', label: 'Wellness' },
  { to: '/products?category=outdoor', label: 'Outdoor' },
]

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container className="grid gap-8 py-12 md:grid-cols-3">
        <div>
          <Link to="/" className="text-lg font-semibold text-slate-900">
            Great Commerce
          </Link>
          <p className="mt-2 text-sm text-slate-600">
            Curated essentials for everyday living.
          </p>
        </div>
        <nav>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Collections
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {COLLECTION_LINKS.map((link) => (
              <li key={link.to}>
                <Link className="hover:text-slate-900" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Categories
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {CATEGORY_LINKS.map((link) => (
              <li key={link.to}>
                <Link className="hover:text-slate-900" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-slate-200 bg-white py-4">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-slate-500 md:flex-row">
          <span>&copy; {new Date().getFullYear()} Great Commerce</span>
          <div className="flex gap-4">
            <a href="https://twitter.com" className="hover:text-slate-700">
              Twitter
            </a>
            <a href="https://instagram.com" className="hover:text-slate-700">
              Instagram
            </a>
            <a href="https://pinterest.com" className="hover:text-slate-700">
              Pinterest
            </a>
          </div>
        </Container>
      </div>
    </footer>
  )
}
