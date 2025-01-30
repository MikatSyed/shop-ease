import ProductList from "@/src/components/ProductList"
import SearchAndFilter from "@/src/components/SearchAndFilter"
import { getCategories, getProducts } from "@/src/lib/api"
import { Suspense } from "react"


export default async function Home() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <Suspense fallback={<div>Loading products...</div>}>
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <SearchAndFilter categories={categories} />
      <ProductList initialProducts={products} />
    </main>
    </Suspense>
  )
}

