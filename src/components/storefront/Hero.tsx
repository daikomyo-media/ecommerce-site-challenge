import { Link } from 'react-router-dom'

export function Hero() {
  const images = [
    'https://picsum.photos/seed/hero-a/800/1000',
    'https://picsum.photos/seed/hero-b/800/1000',
    'https://picsum.photos/seed/hero-c/800/1000',
  ]

  function onErr(e: React.SyntheticEvent<HTMLImageElement>) {
    const t = e.currentTarget
    if (!t.src.endsWith('/assets/placeholder.svg')) t.src = '/assets/placeholder.svg'
  }

  return (
    <section className="py-12">
      <div className="container mx-auto grid gap-8 rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm lg:grid-cols-2 lg:p-10">
        <div className="flex flex-col justify-center gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">New season</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">Curated essentials for everyday living</h1>
            <p className="mt-3 max-w-prose text-slate-600">
              Discover apparel, accessories and home goods crafted with enduring materials and timeless design.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700"
            >
              Shop Now
            </Link>
            <Link
              to="/products?latest=true"
              className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              View Latest Arrivals
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-2 gap-3">
          <img src={images[0]} onError={onErr} alt="Featured 1" className="col-span-2 row-span-2 h-full w-full rounded-xl object-cover" />
          <img src={images[1]} onError={onErr} alt="Featured 2" className="h-full w-full rounded-xl object-cover" />
          <img src={images[2]} onError={onErr} alt="Featured 3" className="h-full w-full rounded-xl object-cover" />
        </div>
      </div>
    </section>
  )
}
