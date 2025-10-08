import { Container } from '../components/layout/Container'
import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getCategories, getCollections, getProducts } from '../lib/api'
import { ProductCard } from '../components/commerce/ProductCard'
import { setParams } from '../lib/query'
import { Seo } from '../lib/seo'
import type { Product } from '../types/product'

export default function PLP() {
  const [searchParams] = useSearchParams()
  const collection = searchParams.get('collection')
  const category = searchParams.get('category')
  const latest = searchParams.get('latest') === 'true'
  const navigate = useNavigate()

  const collections = getCollections()
  const categories = getCategories()

  const products = useMemo<Product[]>(
    () => getProducts({ collection, category, latest }),
    [collection, category, latest],
  )

  return (
    <>
      <Seo
        title="Products"
        description="Browse the full collection of products available at Great Commerce."
      />
      <section className="py-12">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Products</h1>
              <p className="mt-1 text-sm text-slate-600">
                {products.length} result{products.length === 1 ? '' : 's'}
              </p>
            </div>
            <div className="flex flex-wrap items-end gap-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Collection</label>
                <select
                  value={collection ?? ''}
                  onChange={(e) =>
                    navigate({
                      pathname: '/products',
                      search: setParams(window.location.search, [
                        ['collection', e.target.value || null],
                      ]),
                    })
                  }
                  className="rounded-md border border-slate-300 px-2 py-1 text-sm"
                >
                  <option value="">All</option>
                  {collections.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Category</label>
                <select
                  value={category ?? ''}
                  onChange={(e) =>
                    navigate({
                      pathname: '/products',
                      search: setParams(window.location.search, [
                        ['category', e.target.value || null],
                      ]),
                    })
                  }
                  className="rounded-md border border-slate-300 px-2 py-1 text-sm"
                >
                  <option value="">All</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <label className="mb-1 inline-flex items-center gap-2 text-xs font-medium text-slate-600">
                <input
                  type="checkbox"
                  checked={latest}
                  onChange={(e) =>
                    navigate({
                      pathname: '/products',
                      search: setParams(window.location.search, [['latest', e.target.checked]]),
                    })
                  }
                />
                Latest only
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
