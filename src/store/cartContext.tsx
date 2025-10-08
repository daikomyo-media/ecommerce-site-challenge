import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type PropsWithChildren,
} from 'react'

import { calculateCartTotals, cartReducer, createInitialCartState } from './cartReducer'
import type { CartAction } from './cartReducer'
import type { CartState } from '../types/cart'

const CART_STORAGE_KEY = 'great-commerce-cart'

interface CartSnapshot {
  items: CartState['items']
  coupon?: CartState['coupon']
}

function readCartState(): CartState {
  if (typeof window === 'undefined') {
    return createInitialCartState()
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) {
      return createInitialCartState()
    }

    const snapshot = JSON.parse(stored) as CartSnapshot
    if (!Array.isArray(snapshot.items)) {
      return createInitialCartState()
    }

    const totals = calculateCartTotals(snapshot.items, snapshot.coupon)
    return {
      items: snapshot.items,
      coupon: snapshot.coupon,
      ...totals,
    }
  } catch (error) {
    console.warn('Failed to parse stored cart state', error)
    return createInitialCartState()
  }
}

const CartContext = createContext<
  | {
      state: CartState
      dispatch: Dispatch<CartAction>
    }
  | undefined
>(undefined)

export function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(cartReducer, undefined, readCartState)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const snapshot: CartSnapshot = {
      items: state.items,
      coupon: state.coupon,
    }

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(snapshot))
    } catch (error) {
      console.warn('Failed to persist cart state', error)
    }
  }, [state.items, state.coupon])

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
