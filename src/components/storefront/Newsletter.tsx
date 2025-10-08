import { useState } from 'react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setSubmitted(true)
  }

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 shadow-sm sm:p-10">
          <div className="grid items-center gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Join our newsletter</h2>
              <p className="mt-1 text-sm text-slate-600">Be first to hear about new arrivals and exclusive offers.</p>
            </div>
            {submitted ? (
              <p className="text-sm font-medium text-green-700">Thanks! You’re on the list.</p>
            ) : (
              <form onSubmit={onSubmit} className="flex gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
