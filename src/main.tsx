import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './styles/globals.css'
import { HelmetProvider } from 'react-helmet-async'
import { CartProvider } from './store/cartContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
