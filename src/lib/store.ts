import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product, CartItem } from "./types"

interface CartStore {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  total: number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
              total: state.total + product.price,
            }
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }],
            total: state.total + product.price,
          }
        }),
      removeFromCart: (id) =>
        set((state) => {
          const itemToRemove = state.items.find((item) => item.id === id)
          return {
            items: state.items.filter((item) => item.id !== id),
            total: state.total - (itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0),
          }
        }),
      total: 0,
    }),
    {
      name: "cart-storage",
    },
  ),
)

