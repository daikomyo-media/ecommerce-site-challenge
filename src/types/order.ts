import type { CartItem } from './cart'

export interface OrderItem extends CartItem {}

export interface OrderSummary {
  id: string
  items: OrderItem[]
  subtotal: number
  discount: number
  total: number
  coupon?: string
  createdAt: string
}
