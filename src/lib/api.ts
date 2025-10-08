import productsData from '../mocks/products.json'
import collectionsData from '../mocks/collections.json'
import categoriesData from '../mocks/categories.json'
import reviewsData from '../mocks/reviews.json'
import couponsData from '../mocks/coupons.json'

import type { Product } from '../types/product'
import type { Review } from '../types/review'
import type { Collection } from '../types/collection'
import type { Category } from '../types/category'
import type { Coupon } from '../types/coupon'

export interface ProductFilters {
  collection?: string | null
  category?: string | null
  latest?: boolean
}

const products: Product[] = (productsData as Product[]).map((product) => ({
  ...product,
  variants: product.variants.map((variant) => ({ ...variant })),
  collections: [...product.collections],
  categories: [...product.categories],
  images: [...product.images],
}))

const productsById = new Map(products.map((product) => [product.id, product]))
const productsBySlug = new Map(products.map((product) => [product.slug, product]))

const collections: Collection[] = (collectionsData as Collection[]).map((collection) => ({
  ...collection,
}))

const categories: Category[] = (categoriesData as Category[]).map((category) => ({
  ...category,
}))

const reviews: Review[] = (reviewsData as Review[]).map((review) => ({
  ...review,
}))

const coupons: Coupon[] = (couponsData as Coupon[]).map((coupon) => ({
  ...coupon,
  targetIds: coupon.targetIds ? [...coupon.targetIds] : undefined,
}))

export function getProducts(filters: ProductFilters = {}): Product[] {
  const { collection, category, latest } = filters

  return products.filter((product) => {
    if (collection && !product.collections.includes(collection)) {
      return false
    }
    if (category && !product.categories.includes(category)) {
      return false
    }
    if (latest && !product.collections.includes('latest-arrivals')) {
      return false
    }
    return true
  })
}

export function getProductById(id: string): Product | undefined {
  return productsById.get(id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsBySlug.get(slug)
}

export function getVariantByIds(
  productId: string,
  variantId: string,
): { product: Product; variant: Product['variants'][number] } | undefined {
  const product = productsById.get(productId)
  if (!product) return undefined
  const variant = product.variants.find((v) => v.id === variantId)
  if (!variant) return undefined
  return { product, variant }
}

export function getCollections(): Collection[] {
  return collections
}

export function getCategories(): Category[] {
  return categories
}

export function getReviewsByProduct(productId: string): Review[] {
  return reviews.filter((review) => review.productId === productId)
}

export function getCoupons(): Coupon[] {
  return coupons
}

export function getCouponByCode(code: string): Coupon | undefined {
  return coupons.find((coupon) => coupon.code.toLowerCase() === code.toLowerCase())
}
