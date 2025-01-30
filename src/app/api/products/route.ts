import { type NextRequest, NextResponse } from "next/server"
import { getProducts } from "../../../lib/api"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")

  try {
    let products = await getProducts(category || undefined)

    if (search) {
      products = products.filter(
        (product) =>
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

