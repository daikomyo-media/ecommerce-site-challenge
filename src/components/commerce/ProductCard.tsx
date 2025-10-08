import type { Product } from '../../types/product'
import { Link } from 'react-router-dom'
import { useCart } from '../../store/cartContext'
import { buildCartItem } from '../../store/cartActions'
import { formatPrice } from '../../lib/format'

export function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart()

  const basePrice = product.variants.length
    ? Math.min(...product.variants.map((v) => v.price ?? product.price))
    : product.price

  function handleAdd() {
    const variant = product.variants[0]
    const item = buildCartItem(product, variant, 1)
    dispatch({ type: 'ADD_ITEM', payload: { item } })
  }

  const imgSrc = product.images?.[0] ?? '/assets/placeholder.svg'
  function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
    const target = e.currentTarget
    if (target.src.endsWith('/assets/placeholder.svg')) return
    target.src = '/assets/placeholder.svg'
  }

  return (
    <div className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/products/${product.id}`} className="block overflow-hidden rounded-md">
        <img
          src={imgSrc}
          onError={handleImgError}
          alt={product.title}
          loading="lazy"
          className="mb-3 aspect-square w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-slate-900">
          <Link to={`/products/${product.id}`} className="hover:underline">
            {product.title}
          </Link>
        </h3>
        <p className="text-sm text-slate-600">{formatPrice(basePrice)}</p>
      </div>
      <button
        onClick={handleAdd}
        className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
      >
        Add to Cart
      </button>
    </div>
  )
}
