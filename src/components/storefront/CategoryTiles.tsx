import { Link } from 'react-router-dom'
import { getCategories } from '../../lib/api'

export function CategoryTiles() {
  const cats = getCategories().slice(0, 6)

  function onErr(e: React.SyntheticEvent<HTMLImageElement>) {
    const t = e.currentTarget
    if (!t.src.endsWith('/assets/placeholder.svg')) t.src = '/assets/placeholder.svg'
  }

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Shop by Category</h2>
            <p className="mt-1 text-sm text-slate-600">Find something for every room and routine.</p>
          </div>
          <Link to="/products" className="text-sm font-medium text-slate-900 underline-offset-4 hover:underline">
            Browse all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {cats.map((c) => (
            <Link
              key={c.id}
              to={`/products?category=${encodeURIComponent(c.slug)}`}
              className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <img
                src={`https://picsum.photos/seed/cat-${c.slug}/600/400`}
                onError={onErr}
                alt={c.title}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover transition group-hover:scale-[1.02]"
              />
              <div className="p-3 text-center text-sm font-medium text-slate-900">{c.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
