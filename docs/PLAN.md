# Project Plan: Great Commerce Storefront

## Scope

- Integrate existing product, cart, checkout, and success sections into a cohesive React + TypeScript storefront.
- Implement routing, state management, and mock data to simulate an end-to-end e-commerce flow.
- Ensure performance (Lighthouse ≥ 90), accessibility, and responsive design standards.

## Non-Goals

- No backend or real payment processing.
- No external CMS or live API integrations.
- No internationalization or multi-language support in this phase.

## Architecture Overview

- `React 18` + `Vite` with `TypeScript`.
- `React Router v6` for navigation across storefront pages.
- State via React Context + reducer for cart and checkout flows.
- Data sourced from local JSON mocks under `src/mocks/`.
- Styling powered by Tailwind CSS with reusable UI primitives.

## Dependencies

- `react-router-dom`
- `react-helmet-async`
- `tailwindcss`, `postcss`, `autoprefixer`
- Testing: `vitest`, `@testing-library/react`, `playwright` (to be added later)

---

## Phase 0 — Baseline Fixes

- **[x]** Install missing runtime deps: `react-router-dom`, `react-helmet-async`
- **[x]** Verify Tailwind pipeline: `src/styles/globals.css` with `@tailwind` directives
- **[x]** Import `globals.css` in `src/main.tsx`
- **[x]** Confirm `tailwind.config.ts` content includes `./index.html` and `./src/**/*.{ts,tsx}`
- **[x]** Fix Footer copyright symbol (replace `Ac` with `©` in `Footer.tsx:58`)
- **[x]** **FIX TAILWIND V4 STYLING ISSUE** — utilities not generating; consider downgrade to v3

---

## Phase 1 — Data + Utilities

- **[x]** Implement `src/lib/api.ts`: load mocks, export `getProducts()`, `getProductById()`, `getCollections()`, `getCategories()`, `getReviewsByProduct()`, `getCouponByCode()`
- **[x]** Implement `src/lib/query.ts`: `readFiltersFromSearch()`, `setFilters()` for PLP navigation
- **[x]** Implement `src/lib/format.ts`: `formatPrice()`
- **[x]** Ensure TS types match mocks in `src/types/*`
- **[x]** Create mock data files: `products.json`, `collections.json`, `categories.json`, `reviews.json`, `coupons.json`

---

## Phase 2 — State

- **[x]** Cart context/reducer/selectors:
  - **[x]** Complete `src/store/cartReducer.ts` actions: `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QTY`, `CLEAR`, `APPLY_COUPON`, `REMOVE_COUPON`
  - **[x]** Persistence to `localStorage` in `src/store/cartContext.tsx`
  - **[x]** Implement selectors in `src/store/cartSelectors.ts`: `cartCount`, `subtotal`, `applyCoupon`, `total`
- **[x]** Checkout context:
  - **[x]** `src/store/checkoutContext.tsx` with `beginCheckout()`, `confirmOrder()`, `cancelCheckout()`
  - **[x]** Wrap `/checkout` route with `CheckoutProvider` in `src/App.tsx`

---

## Phase 3 — Layout Integration

- **[x]** Navbar badge: Add cart count badge using `cartSelectors.cartCount` in `src/components/layout/Navbar.tsx`
- **[x]** Wrap app with `CartProvider` in `src/main.tsx`
- **[x]** Footer linking: Ensure all collection/category links route to `/products?collection=...` or `/products?category=...`

---

## Phase 4 — Pages

- **[x]** **Home** (`src/routes/Home.tsx`):
  - **[x]** Replace placeholder with hero section and CTAs: "Shop now" → `/products`, "View all" latest → `/products?latest=true`
- **[x]** **PLP** (`src/routes/PLP.tsx`):
  - **[x]** Read filters from `location.search` via `query.ts`
  - **[x]** Filter product list by collection, category, or latest
  - **[x]** Render grid using `ProductCard`
  - **[x]** Card click → `/products/:id`
- **[x]** **PDP** (`src/routes/PDP.tsx`):
  - **[x]** Load product by `:id`; show gallery, price, variant selector, qty
  - **[x]** Display reviews inline
  - **[x]** "Add to Cart" dispatches `ADD_ITEM` with variant+qty, updates navbar badge
- **[x]** **Cart** (`src/routes/Cart.tsx`):
  - **[x]** List items with remove/qty update
  - **[x]** Empty state: "Explore products" → `/products`
  - **[x]** "Apply coupon" input → `APPLY_COUPON`
  - **[x]** "Checkout" → navigate to `/checkout`
- **[x]** **Checkout** (`src/routes/Checkout.tsx`):
  - **[x]** Show summary, allow coupon adjustments
  - **[x]** "Confirm order" → create Order object, clear cart, navigate to `/order/success`
  - **[x]** Cancel/exit → return to `/cart`
- **[ ]** **Order Success** (`src/routes/OrderSuccess.tsx`):
  - **[ ]** Display order summary from sessionStorage
  - **[x]** "Continue Shopping" → `/products`

---

## Phase 5 — Components (Commerce)

- **[x]** Create `src/components/commerce/ProductCard.tsx`
- **[ ]** Create `ProductGrid.tsx`, `VariantSelector.tsx`, `QuantityInput.tsx`, `Price.tsx`, `ReviewDialog.tsx`
- **[x]** Style with Tailwind (pending v4 fix)

---

## Phase 6 — Ports from Previous Sections

- **[ ]** Reuse UI/markup from prior work (Product Listing, Product Details, Shopping Cart, Checkout, Order Success sections)
- **[ ]** Only copy source/assets; do not copy `node_modules`
- **[ ]** Adapt to our types and state

---

## Phase 7 — SEO, A11y, Perf

- **[x]** Add `react-helmet-async` provider in `src/main.tsx`
- **[x]** Add titles/descriptions in each route (Home, PLP partial)
- **[x]** Create `src/lib/seo.tsx` helper
- **[ ]** A11y: focus trap in dialogs, keyboard navigable controls, proper aria labels
- **[ ]** Perf: lazy-load reviews; ensure images have `width`/`height` and `loading="lazy"`

---

## Phase 8 — Testing and QA

- **[ ]** Add Vitest for unit tests: `cartReducer.spec.ts`, `inventory.spec.ts`, `coupon.spec.ts`
- **[ ]** Add Playwright for happy paths: Home → PLP, PLP → PDP add to cart, Cart → Checkout → Success
- **[ ]** Cross-browser smoke (Chrome/Firefox)
- **[ ]** Run Lighthouse; target ≥ 90 all categories

---

## Verification Steps (after each phase)

- **[ ]** Dev: `npm run dev` and validate routes/flows
- **[ ]** Build: `npm run build && npm run preview`
- **[ ]** Sanity checks:
  - **[x]** Cart badge updates when adding/removing
  - **[x]** Footer and Navbar links set correct query params
  - **[ ]** Checkout confirm clears cart and shows order summary
  - **[x]** Cancel checkout restores pre-checkout cart

---

## Nice-to-Haves (time-permitting)

- **[ ]** OG image endpoint (static) and better analytics hooks
- **[ ]** Persist last applied filters in PLP via URL or session storage
- **[ ]** Responsive image sources for storefront hero/cards

## Requirements Mapping

| Requirement | File/Area |
| --- | --- |
| Navbar/Footer integration | `components/layout/` |
| Routes (`/`, `/products`, `/products/:id`, `/cart`, `/checkout`, `/order/success`) | `src/routes/`, `src/App.tsx` |
| Storefront CTAs & navigation flows | `Home.tsx`, `Navbar.tsx`, `Footer.tsx` |
| PLP filters & query handling | `PLP.tsx`, `lib/query.ts` |
| PDP variant selection & reviews | `PDP.tsx`, `components/commerce/` |
| Cart management & inventory check | `Cart.tsx`, `store/cartContext.tsx`, `lib/inventory.ts` |
| Checkout confirm/cancel behaviors | `Checkout.tsx`, `store/checkoutContext.tsx` |
| Order success summary | `OrderSuccess.tsx` |
| Mock data & types | `src/mocks/`, `src/types/` |
| SEO metadata | `lib/seo.tsx`, route files |
| Testing (E2E + unit) | `tests/e2e/`, `tests/unit/` |

## Testing Plan

- **Vitest**: reducers (cart, checkout), inventory, coupon logic.
- **Playwright**:
  - Home → Shop now → PLP CTA.
  - PLP → PDP → Add to cart → badge updates.
  - Cart → Checkout → confirm → success flow.
  - Checkout begin → cancel → cart restored.

## QA Checklist

- [ ] Navigation links functional across Navbar/Footer.
- [ ] CTAs route with proper query params.
- [ ] Cart badge updates on add/remove/update.
- [ ] Checkout confirmations clear cart and display order summary.
- [ ] Dialogs (reviews) accessible via keyboard.
- [ ] Inventory check stops checkout when insufficient stock.
- [ ] Latest arrivals filter works from multiple entry points.
- [ ] Responsive layout tested on mobile/desktop breakpoints.
- [ ] Lighthouse ≥ 90 in all categories.

## Lighthouse Targets

- Performance ≥ 90
- Accessibility ≥ 90
- Best Practices ≥ 90
- SEO ≥ 90

## Known Gaps / Follow-ups

- Need to finalize mock data quantity and ensure coverage of filters.
- Pending integration of existing sections into new structure.
- Need to determine coupon stacking rules (brief specifies best single coupon).
- Identify assets (logos, images) suitable for optimized loading.

## Open Questions

- Are there additional category/collection slugs beyond those provided in the brief?
- Should review submission be simulated or read-only?
