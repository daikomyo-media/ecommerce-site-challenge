export type ProductVariantAttributes = Record<string, string>

export interface ProductVariant {
  id: string
  title: string
  sku: string
  price: number
  inventory: number
  attributes: ProductVariantAttributes
}

export interface Product {
  id: string
  slug: string
  title: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  collections: string[]
  categories: string[]
  variants: ProductVariant[]
  rating: number
  reviewCount: number
}
