import { sanityClient } from "sanity:client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery } from "groq";

// Build optimized image URLs from Sanity image references.
const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Queries use defineQuery so they can be picked up by Sanity TypeGen later.
export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "author": author->name
  }
`);

export async function getPosts() {
  return sanityClient.fetch(POSTS_QUERY);
}

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    publishedAt,
    body,
    mainImage,
    "author": author->name
  }
`);

export async function getPost(slug: string) {
  return sanityClient.fetch(POST_QUERY, { slug });
}
