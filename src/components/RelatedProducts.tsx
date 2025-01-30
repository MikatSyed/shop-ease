import ProductCard from "./ProductCard"
import type { Product } from "../lib/types"

export default function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

