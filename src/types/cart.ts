import type { Coupon } from './coupon'

export interface CartItem {
  productId: string
  variantId: string
  qty: number
  priceSnapshot: number
  titleSnapshot: string
  image: string
  collections: string[]
  categories: string[]
}

export interface CartState {
  items: CartItem[]
  coupon?: Coupon
  subtotal: number
  discount: number
  total: number
}

export interface CartTotals {
  subtotal: number
  discount: number
  total: number
}
