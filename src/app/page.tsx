import { Suspense } from "react"
import ProductList from "../components/ProductList"
import SearchAndFilter from "../components/SearchAndFilter"
import { getCategories, getProducts } from "../lib/api"
import Navbar from "../components/Navbar"


export default async function Home() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <Navbar/>
    <main className="container mx-auto px-4 py-8">
      
      <SearchAndFilter categories={categories} />
      <ProductList initialProducts={products} />
    </main>
    </Suspense>
  )
}

