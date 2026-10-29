import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Cart from './components/Cart'
import type { Train } from './types/train'

function App() {
  const [activePage, setActivePage] = useState('Home')
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
      <Navbar activePage={activePage} onPageChange={setActivePage}  cartCount={cart.length}/>
      {activePage === 'Home' && (
        <Home onAddToCart={handleAddToCart} />
      )}

      {activePage === 'Trains' && <p>Trains page coming soon...</p>}

      {activePage === 'Cart' && (
        <Cart cart={cart} onIncrease={handleIncrease} onDecrease={handleDecrease} />
      )}
      <Footer />
    </div>
  )
}

export default App

