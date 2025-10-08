import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Container } from '../components/layout/Container'
import { useCart } from '../store/cartContext'
import { getCartCount, getCartDiscount, getCartSubtotal, getCartTotal } from '../store/cartSelectors'
import { formatPrice } from '../lib/format'
import { getCouponByCode, getProductById } from '../lib/api'

export default function Cart() {
  const { state, dispatch } = useCart()
  const subtotal = getCartSubtotal(state)
  const discount = getCartDiscount(state)
  const total = getCartTotal(state)
  const count = getCartCount(state)

  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState<string | null>(null)

  function updateQty(productId: string, variantId: string, qty: number) {
    dispatch({ type: 'UPDATE_QTY', payload: { productId, variantId, qty } })
  }

  function removeItem(productId: string, variantId: string) {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantId } })
  }

  function applyCoupon() {
    const code = couponInput.trim()
    if (!code) return
    const coupon = getCouponByCode(code)
    if (!coupon) {
      setCouponError('Coupon not found')
      return
    }
    setCouponError(null)
    dispatch({ type: 'APPLY_COUPON', payload: { coupon } })
  }

  function removeCoupon() {
    dispatch({ type: 'REMOVE_COUPON' })
  }

  return (
    <>
      <Helmet>
        <title>Cart | Great Commerce</title>
        <meta
          name="description"
          content="Review and manage items in your Great Commerce cart."
        />
      </Helmet>
      <section className="py-12">
        <Container>
          <h1 className="text-2xl font-semibold">Your Cart</h1>

          {count === 0 ? (
            <div className="mt-6 rounded-md border border-slate-200 bg-white p-6 text-slate-700">
              <p>Your cart is empty.</p>
              <Link
                to="/products"
                className="mt-4 inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr,380px]">
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={`${item.productId}:${item.variantId}`}
                    className="flex items-center justify-between gap-4 rounded-md border border-slate-200 bg-white p-4"
                  >
                    <CartLineThumb productId={item.productId} title={item.titleSnapshot} price={item.priceSnapshot} />
                    <div className="flex items-center gap-2">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => updateQty(item.productId, item.variantId, Math.max(0, item.qty - 1))}
                        className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-300 text-slate-700 hover:bg-slate-100"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => updateQty(item.productId, item.variantId, item.qty + 1)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-300 text-slate-700 hover:bg-slate-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="ml-3 inline-flex items-center justify-center rounded border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="space-y-4">
                <div className="rounded-md border border-slate-200 bg-white p-4">
                  <h2 className="mb-3 text-sm font-semibold text-slate-900">Coupon</h2>
                  {state.coupon ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Applied: <strong>{state.coupon.code}</strong></span>
                      <button
                        onClick={removeCoupon}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={applyCoupon}
                        className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {couponError && (
                    <p className="mt-2 text-xs text-red-600">{couponError}</p>
                  )}
                </div>

                <div className="rounded-md border border-slate-200 bg-white p-4">
                  <h2 className="mb-3 text-sm font-semibold text-slate-900">Order Summary</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Discount</span>
                      <span className="font-medium">−{formatPrice(discount)}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-2 text-base">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">{formatPrice(total)}</span>
                    </div>
                  </div>
                  <Link
                    to="/checkout"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </aside>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}

function CartLineThumb({
  productId,
  title,
  price,
}: {
  productId: string
  title: string
  price: number
}) {
  const product = getProductById(productId)
  const src = product?.images?.[0] ?? '/assets/placeholder.svg'
  function onErr(e: React.SyntheticEvent<HTMLImageElement>) {
    const t = e.currentTarget
    if (!t.src.endsWith('/assets/placeholder.svg')) t.src = '/assets/placeholder.svg'
  }
  return (
    <div className="flex items-center gap-4">
      <img
        src={src}
        onError={onErr}
        alt={title}
        loading="lazy"
        className="h-16 w-16 rounded object-cover"
      />
      <div>
        <div className="text-sm font-medium text-slate-900">
          <Link to={`/products/${productId}`} className="hover:underline">
            {title}
          </Link>
        </div>
        <div className="text-xs text-slate-600">{formatPrice(price)}</div>
      </div>
    </div>
  )
}
