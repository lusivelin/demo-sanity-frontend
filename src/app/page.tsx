import Link from "next/link";
import { defineQuery } from "next-sanity";

export default async function IndexPage() {
  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
            <h1 className="text-4xl font-bold tracking-tighter">Demo Menu</h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <li className="bg-white p-4 rounded-lg">
          <Link
            className="hover:underline"
            href={`/products`}
          >
            <h2 className="text-xl font-semibold">Products</h2>
          </Link>
        </li>
        <li className="bg-white p-4 rounded-lg">
          <Link
            className="hover:underline"
            href={`/customers`}
          >
            <h2 className="text-xl font-semibold">Customers</h2>
          </Link>
        </li>
      </ul>
    </main>
  );
}