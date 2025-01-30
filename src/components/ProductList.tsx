"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "./ProductCard"
import type { Product } from "../lib/types"

export default function ProductList({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts)
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchProducts = async () => {
      const search = searchParams.get("search")
      const category = searchParams.get("category")
      const url = `/api/products?${new URLSearchParams({ search: search || "", category: category || "" })}`
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    }

    fetchProducts()
  }, [searchParams])

  return (
    <Suspense fallback={<div>Loading products...</div>}> 
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </Suspense>
  )
}

