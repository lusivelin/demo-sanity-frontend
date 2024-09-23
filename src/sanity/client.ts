import api from "@/lib/sanity.api"
import { ClientConfig, createClient, QueryParams } from "next-sanity";

const { projectId, dataset, apiVersion, token } = api

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  // set CDN to live API in development mode
  useCdn: process.env.NODE_ENV === "development" ? true : false,
  token,
};

export const client = createClient(config);

export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, qParams, {
    cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    next: { tags },
  });
}