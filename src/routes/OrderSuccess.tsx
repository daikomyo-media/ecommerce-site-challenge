import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { Container } from '../components/layout/Container'

export default function OrderSuccess() {
  return (
    <>
      <Helmet>
        <title>Order Success | Great Commerce</title>
        <meta
          name="description"
          content="Thank you for your order with Great Commerce. Review your summary and continue shopping."
        />
      </Helmet>
      <section className="py-12">
        <Container className="space-y-6">
          <h1 className="text-2xl font-semibold">Order Confirmed</h1>
          <p className="text-slate-600">
            Order summary and personalized recommendations will be displayed here after checkout is fully integrated.
          </p>
          <Link
            to="/products"
            className="inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Continue Shopping
          </Link>
        </Container>
      </section>
    </>
  )
}
