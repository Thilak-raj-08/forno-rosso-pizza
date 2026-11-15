'use client'

import { createContext, useContext, useState, useMemo } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([
    {
      id: 'margherita-dop',
      name: 'Margherita Verace DOP',
      subtitle: 'Classic 72h Dough • 12" Napoletana',
      price: 18,
      qty: 1,
      image: '/images/hero-margherita.jpg',
    },
  ])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [orderStage, setOrderStage] = useState(null) // null | 'stretching' | 'firing' | 'garnishing' | 'dispatched'

  const addItem = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setIsDrawerOpen(true)
  }

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    )
  }

  const clearCart = () => setItems([])

  const startLiveBake = () => {
    setOrderStage('stretching')
    setTimeout(() => setOrderStage('firing'), 2200)
    setTimeout(() => setOrderStage('garnishing'), 4500)
    setTimeout(() => setOrderStage('dispatched'), 6800)
  }

  const resetOrderStage = () => {
    setOrderStage(null)
    setItems([])
  }

  const totals = useMemo(() => {
    const count = items.reduce((acc, i) => acc + i.qty, 0)
    const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0)
    return { count, subtotal }
  }, [items])

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        setIsDrawerOpen,
        addItem,
        updateQty,
        clearCart,
        totals,
        orderStage,
        startLiveBake,
        resetOrderStage,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
