import { defineQuery, PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

const PRODUCT_QUERY = defineQuery(`*[
    _type == "product" &&
    slug.current == $slug
  ][0]{
    _id,
    name,
    slug,
    date,
    price,
    productType,
    important,
    image,
    details,
    tickets
}`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function productPage({
  params,
}: {
  params: { slug: string };
}) {
  const product: any = await sanityFetch({
    query: PRODUCT_QUERY, 
    qParams: params,
    tags: ['product']
  });
  if (!product) {
    notFound();
  }
  
  const {
    name,
    date,
    price,
    productType,
    important,
    image,
    details,
    tickets,
  } = product;

  const productImageUrl = image
    ? urlFor(image)?.width(550).height(310).url()
    : null;
  const productDate = new Date(date).toDateString();

  return (
    <main className="container mx-auto grid gap-12 p-12">
      <div className="mb-4">
        <Link href="/">← Back to products</Link>
      </div>
      <div className="grid items-top gap-12 sm:grid-cols-2">
        <Image
          src={productImageUrl || "https://via.placeholder.com/550x310"}
          alt={name || "Product"}
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          height="310"
          width="550"
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-4">
            {name && (
              <h1 className="text-4xl font-bold tracking-tighter mb-8">
                {name}
              </h1>
            )}
            <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
              <dd className="font-semibold">Date</dd>
              <dt>{productDate}</dt>
              <dd className="font-semibold">Price</dd>
              <dt>{price ? `$${price}` : 'N/A'}</dt>
              <dd className="font-semibold">Product Type</dd>
              <dt>{productType || 'N/A'}</dt>
              {important && (
                <>
                  <dd className="font-semibold">Important Note</dd>
                  <dt>{important}</dt>
                </>
              )}
            </dl>
          </div>
          {details && details.length > 0 && (
            <div className="prose max-w-none">
              <PortableText value={details} />
            </div>
          )}
          {tickets && (
            <a
              className="flex items-center justify-center rounded-md bg-blue-500 p-4 text-white"
              href={tickets}
            >
              Buy Tickets
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
