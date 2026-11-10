
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Cart from './components/Cart'
import Trains from './components/Trains'
import TrainDetails from './components/TrainDetails'
import type { Train } from './types/train'

function App() {
  const [cart, setCart] = useState<Train[]>([])

  const handleAddToCart = (train: Train) => {
    setCart((prevCart) => [...prevCart, train])
  }

  const handleIncrease = (train: Train) => {
    setCart((prevCart) => [...prevCart, train])
  }

  const handleDecrease = (train: Train) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === train.id)

      if (index === -1) return prevCart

      return prevCart.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#111126] text-white">

      <Navbar cartCount={cart.length} />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<Home onAddToCart={handleAddToCart} />}
          />

          <Route
            path="/trains"
            element={<Trains />}
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            }
          />

          <Route
            path="/trains/:id"
            element={<TrainDetails />}
          />
        </Routes>
      </main>

      <Footer />

    </div>
  )
}

export default App
