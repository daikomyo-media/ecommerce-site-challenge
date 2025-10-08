import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  // Access env in a way that doesn't require @types/node
  const isVercel = Boolean((globalThis as any)?.process?.env?.VERCEL)
  return {
    plugins: [react()],
    base: isVercel ? '/' : '/ecommerce-site-challenge/',
  }
})
