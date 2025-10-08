import type { Product } from '../../types/product'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products, emptyText = 'No products found.' }: { products: Product[]; emptyText?: string }) {
  if (!products || products.length === 0) {
    return <p className="text-sm text-slate-600">{emptyText}</p>
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
