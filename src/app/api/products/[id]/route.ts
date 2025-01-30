import { type NextRequest, NextResponse } from "next/server"
import { getProduct } from "../../../../lib/api"

export async function GET(request: NextRequest, { params }: any ) {
  try {
    const product = await getProduct(params.id)
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

