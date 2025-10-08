import type { Product, ProductVariant } from '../types/product'
import type { CartItem } from '../types/cart'

export function buildCartItem(
  product: Product,
  variant: ProductVariant,
  qty: number,
): CartItem {
  const price = typeof variant.price === 'number' ? variant.price : product.price
  return {
    productId: product.id,
    variantId: variant.id,
    qty,
    priceSnapshot: price,
    titleSnapshot: `${product.title}${variant.title ? ` - ${variant.title}` : ''}`,
    image: product.images?.[0] ?? '',
    collections: product.collections,
    categories: product.categories,
  }
}
