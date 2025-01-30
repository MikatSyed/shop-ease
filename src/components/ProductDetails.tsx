"use client"

import Image from "next/image"
import { useState } from "react"
import { useCartStore } from "../lib/store"
import { motion } from "framer-motion"
import { FaShoppingCart, FaStar, FaCheck, FaTruck, FaUndo } from "react-icons/fa"
import toast, { Toaster } from "react-hot-toast"; 

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductDetails({ product }: { product: Product }) {
  const addToCart = useCartStore((state: any) => state.addToCart)
  const cartItems = useCartStore((state: any) => state.cartItems)  
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isAdded, setIsAdded] = useState(false)

  const isProductInCart = cartItems?.some((item: any) => item.id === product.id);

  const handleAddToCart = () => {
    if (isProductInCart) {
      toast.error(`${product.title} is already in your cart!`, {
        position: "top-center",
        duration: 3000,
      });
    } else {
      addToCart({ ...product, size: selectedSize }); 
      setIsAdded(true);  
      toast.success(`${product.title} added to cart! 🛒`, {
        position: "top-center",
        duration: 3000,
      });
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-contain" />
            </div>
          </div>
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.floor(product.rating.rate) ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">{product.rating.count} reviews</span>
              </div>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Select Size</h2>
                <div className="flex flex-wrap gap-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-md border ${
                        selectedSize === size
                          ? "border-blue-500 bg-blue-50 text-blue-500"
                          : "border-gray-300 hover:border-blue-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                <span className="text-sm text-green-500 font-semibold">In Stock</span>
              </div>
              <motion.button
                onClick={handleAddToCart}
                disabled={!selectedSize || isAdded} 
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                  isAdded
                    ? "bg-blue-500 hover:bg-green-600 cursor-not-allowed"
                    : selectedSize
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {isAdded ? (
                  <>
                    <FaCheck className="mr-2" />
                    Added to Cart
                  </>
                ) : isProductInCart ? (
                  <>
                    <FaCheck className="mr-2" />
                    In Cart
                  </>
                ) : (
                  <>
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <li className="flex items-center">
              <FaTruck className="mr-2 text-blue-500" />
              Free shipping on orders over $100
            </li>
            <li className="flex items-center">
              <FaUndo className="mr-2 text-blue-500" />
              30-day easy return policy
            </li>
            <li>
              <span className="font-semibold">Category:</span> {product.category}
            </li>
            <li>
              <span className="font-semibold">Product ID:</span> {product.id}
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
