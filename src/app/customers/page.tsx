/* eslint-disable  @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/client";

const CUSTOMERS_QUERY = defineQuery(`*[ 
  _type == "customer" 
]{ 
  _id, 
  fullName, 
  email, 
  phone, 
  nationality, 
  slug 
}|order(fullName asc)`);

export default async function CustomersPage() {
  const customers: any = await sanityFetch({
    query: CUSTOMERS_QUERY, 
    qParams: {},
    tags: ['customers']
  });

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <div className="mb-4">
        <Link href="/">← Back to Menu</Link>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold tracking-tighter">Customers</h1>
        <Link href="/customers/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Create Customer
          </button>
        </Link>
      </div>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {customers.map((customer: any) => (
          <li className="bg-white p-4 rounded-lg shadow-md" key={customer._id}>
            <Link
              className="hover:underline"
              href={`/customers/${customer?.slug?.current}`} // Adjust the path as needed
            >
              <h2 className="text-xl font-semibold">{customer?.fullName}</h2>
              <p className="text-sm text-gray-600">Email: {customer.email}</p>
              <p className="text-sm text-gray-600">Phone: {customer.phone}</p>
              <p className="text-sm text-gray-600">Nationality: {customer.nationality}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
