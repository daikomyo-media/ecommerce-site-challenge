import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Layout } from './components/layout/Layout'
import Cart from './routes/Cart'
import Checkout from './routes/Checkout'
import Home from './routes/Home'
import OrderSuccess from './routes/OrderSuccess'
import PDP from './routes/PDP'
import PLP from './routes/PLP'
import { CheckoutProvider } from './store/checkoutContext'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<PLP />} />
          <Route path="/products/:id" element={<PDP />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <CheckoutProvider>
                <Checkout />
              </CheckoutProvider>
            }
          />
          <Route path="/order/success" element={<OrderSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
