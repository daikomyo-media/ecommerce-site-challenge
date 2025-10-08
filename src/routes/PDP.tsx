import { Helmet } from 'react-helmet-async'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Container } from '../components/layout/Container'
import { getProductById, getReviewsByProduct } from '../lib/api'
import { useCart } from '../store/cartContext'
import { buildCartItem } from '../store/cartActions'
import { formatPrice } from '../lib/format'

export default function PDP() {
  const params = useParams()
  const id = params.id as string
  const product = useMemo(() => (id ? getProductById(id) : undefined), [id])
  const { dispatch } = useCart()

  if (!product) {
    return (
      <section className="py-12">
        <Container>
          <p className="text-slate-700">Product not found.</p>
        </Container>
      </section>
    )
  }

  const [variantId, setVariantId] = useState<string | undefined>(
    product.variants?.[0]?.id,
  )
  const [qty, setQty] = useState(1)
  const [activeIdx, setActiveIdx] = useState(0)

  const reviews = useMemo(() => getReviewsByProduct(product.id), [product.id])

  const selectedVariant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]
  const price = selectedVariant?.price ?? product.price

  // Image handling with graceful fallback and selection
  const imgs = (product.images?.length ? product.images : ['/assets/placeholder.svg']) as string[]
  const mainImg = imgs[Math.min(activeIdx, imgs.length - 1)]
  function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
    const target = e.currentTarget
    if (target.src.endsWith('/assets/placeholder.svg')) return
    target.src = '/assets/placeholder.svg'
  }

  function addToCart() {
    if (!selectedVariant) return
    const item = buildCartItem(product as NonNullable<typeof product>, selectedVariant, qty)
    dispatch({ type: 'ADD_ITEM', payload: { item } })
  }

  return (
    <>
      <Helmet>
        <title>{product.title} | Great Commerce</title>
        <meta
          name="description"
          content={product.description}
        />
      </Helmet>
      <section className="py-12">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <img
              src={mainImg}
              onError={handleImgError}
              alt={product.title}
              className="aspect-square w-full rounded-md object-cover"
              loading="eager"
            />
            <div className="mt-3 grid grid-cols-4 gap-2">
              {imgs.slice(0, 8).map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`relative overflow-hidden rounded border ${
                    i === activeIdx ? 'border-slate-900 ring-2 ring-slate-900' : 'border-slate-200'
                  }`}
                >
                  <img
                    src={src}
                    onError={handleImgError}
                    alt={`${product.title} thumbnail ${i + 1}`}
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-slate-900">{product.title}</h1>
            <p className="text-sm text-slate-600">{product.description}</p>

            <div className="text-2xl font-semibold">{formatPrice(price)}</div>

            {product.variants.length > 0 && (
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Variant
                </label>
                <select
                  value={selectedVariant?.id}
                  onChange={(e) => setVariantId(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {product.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.title || v.sku}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Quantity
              </label>
              <div className="inline-flex items-center gap-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min((selectedVariant?.inventory ?? q + 1), q + 1))}
                  className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={addToCart}
              className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Add to Cart
            </button>

            <div className="pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Reviews ({reviews.length})
              </h2>
              <div className="mt-3 space-y-3">
                {reviews.map((r) => (
                  <div key={r.id} className="rounded-md border border-slate-200 bg-white p-3">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>{r.title}</span>
                      <span className="text-slate-500">{r.rating}★</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-700">{r.body}</p>
                    <p className="mt-1 text-xs text-slate-500">{r.author} · {new Date(r.date).toLocaleDateString()}</p>
                  </div>
                ))}
                {reviews.length === 0 && (
                  <p className="text-sm text-slate-600">No reviews yet.</p>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
