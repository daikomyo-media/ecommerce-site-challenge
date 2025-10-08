import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from 'react'
import { useNavigate } from 'react-router-dom'

import type { OrderSummary } from '../types/order'
import type { CartState } from '../types/cart'
import { useCart } from './cartContext'
import { calculateCartTotals, createInitialCartState } from './cartReducer'

const ORDER_STORAGE_KEY = 'great-commerce-order'

interface CheckoutState {
  status: 'idle' | 'in_progress'
}

type CheckoutAction =
  | { type: 'BEGIN' }
  | { type: 'CANCEL' }

function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case 'BEGIN':
      return { status: 'in_progress' }
    case 'CANCEL':
      return { status: 'idle' }
    default:
      return state
  }
}

function buildOrderSummary(cart: CartState): OrderSummary {
  const { subtotal, discount, total } = calculateCartTotals(cart.items, cart.coupon)
  return {
    id: `${Date.now()}`,
    items: cart.items.map((i) => ({ ...i })),
    subtotal,
    discount,
    total,
    coupon: cart.coupon?.code,
    createdAt: new Date().toISOString(),
  }
}

function persistOrder(summary: OrderSummary) {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(summary))
  } catch {}
}

export function readPersistedOrder(): OrderSummary | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    const raw = window.sessionStorage.getItem(ORDER_STORAGE_KEY)
    if (!raw) return undefined
    return JSON.parse(raw) as OrderSummary
  } catch {
    return undefined
  }
}

const CheckoutContext = createContext<
  | {
      status: CheckoutState['status']
      begin: () => void
      cancel: () => void
      confirm: (payload: { name: string; email: string; address: string }) => void
    }
  | undefined
>(undefined)

export function CheckoutProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate()
  const { state: cartState, dispatch: cartDispatch } = useCart()
  const [state, dispatch] = useReducer(checkoutReducer, { status: 'idle' })

  const begin = useCallback(() => {
    dispatch({ type: 'BEGIN' })
  }, [])

  const cancel = useCallback(() => {
    dispatch({ type: 'CANCEL' })
  }, [])

  const confirm = useCallback(
    (_payload: { name: string; email: string; address: string }) => {
      // Build summary from current cart
      const snapshot: CartState = cartState ?? createInitialCartState()
      const summary = buildOrderSummary(snapshot)
      persistOrder(summary)

      // Clear cart and reset checkout
      cartDispatch({ type: 'CLEAR' })
      dispatch({ type: 'CANCEL' })

      // Navigate to success page
      navigate('/order/success', { state: { order: summary }, replace: true })
    },
    [cartState, cartDispatch, navigate],
  )

  const value = useMemo(
    () => ({ status: state.status, begin, cancel, confirm }),
    [state.status, begin, cancel, confirm],
  )

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext)
  if (!ctx) throw new Error('useCheckout must be used within a CheckoutProvider')
  return ctx
}
