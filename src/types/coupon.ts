export type CouponType = 'percent' | 'fixed'

type CouponTargetType = 'all' | 'collection' | 'category' | 'product'

export interface Coupon {
  code: string
  type: CouponType
  value: number
  appliesTo?: CouponTargetType
  targetIds?: string[]
  minimumSubtotal?: number
}
