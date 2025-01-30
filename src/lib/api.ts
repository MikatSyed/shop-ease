import type { Product } from "./types"

const API_URL = "https://fakestoreapi.com"

export async function getProducts(category?: string): Promise<Product[]> {
  const url = category ? `${API_URL}/products/category/${category}` : `${API_URL}/products`
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`)
  if (!res.ok) throw new Error("Failed to fetch product")
  return res.json()
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${API_URL}/products/categories`)
  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json()
}

