import type { CartItem, CartState } from '../types/cart'

export function getCartCount(state: CartState): number {
  return state.items.reduce((sum, item) => sum + item.qty, 0)
}

export function getCartSubtotal(state: CartState): number {
  return state.subtotal
}

export function getCartTotal(state: CartState): number {
  return state.total
}

export function getCartDiscount(state: CartState): number {
  return state.discount
}

export function hasCartItems(state: CartState): boolean {
  return state.items.length > 0
}

export function getAppliedCouponLabel(state: CartState): string | undefined {
  if (!state.coupon) {
    return undefined
  }
  return state.coupon.code
}

export function findCartItem(
  items: CartItem[],
  productId: string,
  variantId: string,
): CartItem | undefined {
  return items.find(
    (item) => item.productId === productId && item.variantId === variantId,
  )
}
