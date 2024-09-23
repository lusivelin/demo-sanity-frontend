import Link from "next/link";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";

const options = { next: { revalidate: 60 } };

const PRODUCTS_QUERY = defineQuery(`*[
  _type == "product"
]{
  _id,
  name,
  slug,
  price,
  images[] {
    asset-> {
      _id,
      url
    }
  },
  category-> { _id, name },
  productType
}|order(date desc)`);

export default async function IndexPage() {
  const products = await client.fetch(PRODUCTS_QUERY, {}, options);

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <div className="mb-4">
        <Link href="/">← Back to Menu</Link>
      </div>
      <h1 className="text-4xl font-bold tracking-tighter">Products</h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {products.map((product: any) => (
          <li className="bg-white p-4 rounded-lg shadow-md" key={product._id}>
            <Link
              className="hover:underline"
              href={`/products/${product?.slug?.current}`}
            >
              <h2 className="text-xl font-semibold">{product?.name}</h2>
              {product?.images && product.images.length > 0 && (
                <img
                  src={product.images[0].asset.url}
                  alt={product.name}
                  className="mt-2 mb-4 w-full h-auto rounded"
                />
              )}
              {product.price && (
                <p className="text-lg font-medium">
                  Price: ${product.price.toFixed(2)}
                </p>
              )}
              {product.category && (
                <p className="text-sm text-gray-600">
                  Category: {product.category.name}
                </p>
              )}
              {product.productType && (
                <p className="text-sm text-gray-600">
                  Type: {product.productType}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
