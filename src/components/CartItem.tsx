"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import type { CartItem as CartItemType } from "../lib/types"
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa"

export default function CartItem({
  item,
  onRemove,
  onQuantityChange,
}: {
  item: CartItemType
  onRemove: (id: number) => void
  onQuantityChange: (id: number, quantity: number) => void
}) {
  const [quantity, setQuantity] = useState(item.quantity || 1)

  // 🔹 Notify parent when quantity changes (AFTER render)
  useEffect(() => {
    onQuantityChange(item.id, quantity)
  }, [quantity]) // ✅ Runs only when `quantity` updates

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <div className="flex items-center justify-between border-b py-4">
      {/* Product Image & Details */}
      <div className="flex items-center gap-6 w-1/3">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          width={80}
          height={80}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center w-1/4 justify-center">
        <button
          onClick={handleDecrease}
          className="bg-gray-200 text-gray-700 p-2 rounded-l-lg hover:bg-gray-300 transition"
        >
          <FaMinus size={14} />
        </button>
        <span className="px-4 py-2 border text-gray-900 bg-white w-10 text-center">{quantity}</span>
        <button
          onClick={handleIncrease}
          className="bg-gray-200 text-gray-700 p-2 rounded-r-lg hover:bg-gray-300 transition"
        >
          <FaPlus size={14} />
        </button>
      </div>

      {/* Dynamically Calculated Total Price */}
      <div className="w-1/4 text-lg font-bold text-gray-900 text-center">
        ${(item.price * quantity).toFixed(2)}
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-600 hover:text-red-800 p-2 rounded-lg transition w-1/6 flex justify-center"
      >
        <FaTrash size={18} />
      </button>
    </div>
  )
}
