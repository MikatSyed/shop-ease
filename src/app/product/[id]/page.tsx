import ProductDetails from "@/src/components/ProductDetails"
import RelatedProducts from "@/src/components/RelatedProducts"
import { getProduct, getProducts } from "@/src/lib/api"


export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export default async function ProductPage({ params }:any) {
  const product = await getProduct(params.id)
  const relatedProducts = await getProducts(product.category)

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails product={product} />
      <RelatedProducts products={relatedProducts.filter((p) => p.id !== product.id).slice(0, 4)} />
    </div>
  )
}

