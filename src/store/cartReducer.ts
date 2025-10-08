import type { Coupon } from '../types/coupon'
import type { CartItem, CartState, CartTotals } from '../types/cart'

export type CartAction =
  | {
      type: 'ADD_ITEM'
      payload: {
        item: CartItem
      }
    }
  | {
      type: 'REMOVE_ITEM'
      payload: {
        productId: string
        variantId: string
      }
    }
  | {
      type: 'UPDATE_QTY'
      payload: {
        productId: string
        variantId: string
        qty: number
      }
    }
  | { type: 'CLEAR' }
  | {
      type: 'APPLY_COUPON'
      payload: {
        coupon: Coupon
      }
    }
  | { type: 'REMOVE_COUPON' }

export function createInitialCartState(): CartState {
  return {
    items: [],
    subtotal: 0,
    discount: 0,
    total: 0,
  }
}

function isItemEligibleForCoupon(item: CartItem, coupon: Coupon) {
  if (!coupon.appliesTo || coupon.appliesTo === 'all') {
    return true
  }

  if (!coupon.targetIds?.length) {
    return false
  }

  if (coupon.appliesTo === 'collection') {
    return item.collections.some((id) => coupon.targetIds?.includes(id))
  }

  if (coupon.appliesTo === 'category') {
    return item.categories.some((id) => coupon.targetIds?.includes(id))
  }

  if (coupon.appliesTo === 'product') {
    return coupon.targetIds.includes(item.productId)
  }

  return false
}

export function calculateCartTotals(items: CartItem[], coupon?: Coupon): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + item.priceSnapshot * item.qty, 0)
  if (!coupon) {
    return { subtotal, discount: 0, total: subtotal }
  }

  if (coupon.minimumSubtotal && subtotal < coupon.minimumSubtotal) {
    return { subtotal, discount: 0, total: subtotal }
  }

  const eligibleItems = items.filter((item) => isItemEligibleForCoupon(item, coupon))
  const eligibleSubtotal = eligibleItems.reduce(
    (sum, item) => sum + item.priceSnapshot * item.qty,
    0,
  )

  if (eligibleItems.length === 0 || eligibleSubtotal === 0) {
    return { subtotal, discount: 0, total: subtotal }
  }

  let discount = 0
  if (coupon.type === 'percent') {
    discount = (eligibleSubtotal * coupon.value) / 100
  } else if (coupon.type === 'fixed') {
    discount = coupon.value
  }

  discount = Math.min(discount, eligibleSubtotal)
  const total = Math.max(0, subtotal - discount)
  return { subtotal, discount, total }
}

function mergeItems(items: CartItem[], incoming: CartItem): CartItem[] {
  const existingIndex = items.findIndex(
    (item) =>
      item.productId === incoming.productId && item.variantId === incoming.variantId,
  )

  if (existingIndex >= 0) {
    const next = [...items]
    next[existingIndex] = {
      ...next[existingIndex],
      qty: next[existingIndex].qty + incoming.qty,
    }
    return next
  }

  return [...items, incoming]
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const items = mergeItems(state.items, action.payload.item)
      const totals = calculateCartTotals(items, state.coupon)
      return { ...state, items, ...totals }
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter(
        (item) =>
          !(
            item.productId === action.payload.productId &&
            item.variantId === action.payload.variantId
          ),
      )
      const totals = calculateCartTotals(items, state.coupon)
      return { ...state, items, ...totals }
    }
    case 'UPDATE_QTY': {
      const items = state.items
        .map((item) => {
          if (
            item.productId === action.payload.productId &&
            item.variantId === action.payload.variantId
          ) {
            return { ...item, qty: action.payload.qty }
          }
          return item
        })
        .filter((item) => item.qty > 0)
      const totals = calculateCartTotals(items, state.coupon)
      return { ...state, items, ...totals }
    }
    case 'CLEAR':
      return createInitialCartState()
    case 'APPLY_COUPON': {
      const totals = calculateCartTotals(state.items, action.payload.coupon)
      return { ...state, coupon: action.payload.coupon, ...totals }
    }
    case 'REMOVE_COUPON': {
      const totals = calculateCartTotals(state.items)
      return { ...state, coupon: undefined, ...totals }
    }
    default:
      return state
  }
}
