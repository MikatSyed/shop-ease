"use client"

import CartItem from "@/src/components/CartItem"
import { useCartStore } from "../../lib/store"
import Navbar from "@/src/components/Navbar"
import { useState, useEffect } from "react"

export default function CartPage() {
  const { items, removeFromCart } = useCartStore()
  const [cartItems, setCartItems] = useState(items)

  // Function to update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  // Function to calculate total price of all items
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  useEffect(() => {
    setCartItems(items) // Ensure state sync when items change
  }, [items])

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onQuantityChange={updateQuantity}
              />
            ))}

            {/* Total sum of all cart items */}
            <div className="flex justify-end mt-8">
              <div className="text-2xl font-bold bg-gray-100 p-4 rounded-lg shadow-md">
                Total: ${calculateTotal().toFixed(2)}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
