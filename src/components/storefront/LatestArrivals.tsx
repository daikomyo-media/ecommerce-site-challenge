import { Link } from 'react-router-dom'
import { getProducts } from '../../lib/api'
import { ProductGrid } from '../commerce/ProductGrid'

export function LatestArrivals() {
  const latest = getProducts({ latest: true }).slice(0, 8)
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Latest Arrivals</h2>
            <p className="mt-1 text-sm text-slate-600">Fresh picks from this season.</p>
          </div>
          <Link
            to="/products?latest=true"
            className="text-sm font-medium text-slate-900 underline-offset-4 hover:underline"
          >
            View all
          </Link>
        </div>
        <ProductGrid products={latest} emptyText="No latest items yet." />
      </div>
    </section>
  )
}
