import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Container } from '../components/layout/Container'
import { useCheckout } from '../store/checkoutContext'
import { useCart } from '../store/cartContext'
import { getCartTotal } from '../store/cartSelectors'
import { formatPrice } from '../lib/format'

export default function Checkout() {
  const { begin, cancel, confirm } = useCheckout()
  const navigate = useNavigate()
  const { state: cart } = useCart()
  const total = getCartTotal(cart)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    begin()
  }, [begin])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    confirm({ name, email, address })
  }

  function onCancel() {
    cancel()
    navigate('/cart')
  }

  return (
    <>
      <Helmet>
        <title>Checkout | Great Commerce</title>
        <meta
          name="description"
          content="Secure checkout experience for completing your Great Commerce order."
        />
      </Helmet>
      <section className="py-12">
        <Container className="grid gap-6 lg:grid-cols-[1fr,420px]">
          <div className="rounded-md border border-slate-200 bg-white p-6">
            <h1 className="text-2xl font-semibold">Checkout</h1>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Shipping address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  rows={4}
                  className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>

          <aside className="space-y-4">
            <div className="rounded-md border border-slate-200 bg-white p-6">
              <h2 className="mb-3 text-sm font-semibold text-slate-900">Order Total</h2>
              <p className="text-2xl font-semibold">{formatPrice(total)}</p>
              <p className="mt-1 text-xs text-slate-600">Taxes and shipping calculated at next step.</p>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-6">
              <h2 className="mb-3 text-sm font-semibold text-slate-900">Need to edit your cart?</h2>
              <Link to="/cart" className="text-sm text-blue-600 hover:text-blue-700">
                Return to cart
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </>
  )
}
