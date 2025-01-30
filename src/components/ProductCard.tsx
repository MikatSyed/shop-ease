"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../lib/store";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function ProductCard({ product }: { product: any }) {
  const addToCart = useCartStore((state: any) => state.addToCart);
  const cartItems = useCartStore((state: any) => state.items);
  const [isHovered, setIsHovered] = useState(false);

  // Check if the product is already in the cart
  const isProductInCart = cartItems?.some((item: any) => item.id === product.id);

  const handleAddToCart = () => {
    if (isProductInCart) {
      toast.error(`${product.title} is already in your cart!`, {
        position: "top-center",
        duration: 3000,
      });
    } else {
      addToCart(product);
      toast.success(`${product.title} added to cart! 🛒`, {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          <Link href={`/product/${product.id}`}>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaEye className="text-white" size={30} />
            </motion.div>
          </Link>
          {product?.isNew && (
            <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              New
            </span>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.title}</h2>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product?.oldPrice && (
              <span className="text-sm text-gray-500 line-through">${product?.oldPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
        <div className="px-4 pb-4">
          <button
            onClick={handleAddToCart}
            disabled={isProductInCart}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              isProductInCart ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
          >
            <FaShoppingCart />
            {isProductInCart ? "Already in Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </>
  );
}
