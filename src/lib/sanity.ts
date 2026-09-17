import { sanityClient } from "sanity:client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery } from "groq";

// Build optimized image URLs from Sanity image references.
const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/* Insights ---------------------------------------------------------------- */

export const INSIGHTS_QUERY = defineQuery(`
  *[_type == "insight" && defined(slug.current)] | order(_createdAt desc){
    _id,
    title,
    slug,
    teaser,
    coverImage,
    tags,
    "author": author->{ name, position, image }
  }
`);
export async function getInsights() {
  return sanityClient.fetch(INSIGHTS_QUERY);
}

export const INSIGHT_QUERY = defineQuery(`
  *[_type == "insight" && slug.current == $slug][0]{
    title,
    teaser,
    tldr,
    body,
    coverImage,
    tags,
    "author": author->{ name, position, image },
    metaTitle, metaDescription, ogImage, keywords, canonicalUrl, noIndex
  }
`);
export async function getInsight(slug: string) {
  return sanityClient.fetch(INSIGHT_QUERY, { slug });
}

/* Service groups & services ---------------------------------------------- */

export const SERVICE_GROUPS_QUERY = defineQuery(`
  *[_type == "serviceGroup" && defined(slug.current)] | order(title asc){
    _id,
    title,
    slug,
    coverImage,
    description,
    "services": *[_type == "service" && references(^._id)] | order(weight asc){
      _id, title, slug, coverImage
    }
  }
`);
export async function getServiceGroups() {
  return sanityClient.fetch(SERVICE_GROUPS_QUERY);
}

// Services in manual (weight) order.
export const SERVICES_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)] | order(weight asc){
    _id,
    title,
    slug,
    coverImage,
    description,
    "group": serviceGroup->{ title, slug },
    relatedInsights[]->{ _id, title, slug, teaser, coverImage }
  }
`);
export async function getServices() {
  return sanityClient.fetch(SERVICES_QUERY);
}

/* Case studies ------------------------------------------------------------ */

export const CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)] | order(_createdAt desc){
    _id,
    title,
    slug,
    teaser,
    coverImage,
    "author": author->{ name, position, image }
  }
`);
export async function getCaseStudies() {
  return sanityClient.fetch(CASE_STUDIES_QUERY);
}

export const CASE_STUDY_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    title,
    teaser,
    body,
    coverImage,
    "author": author->{ name, position, image },
    relatedInsights[]->{ _id, title, slug, teaser, coverImage },
    metaTitle, metaDescription, ogImage, keywords, canonicalUrl, noIndex
  }
`);
export async function getCaseStudy(slug: string) {
  return sanityClient.fetch(CASE_STUDY_QUERY, { slug });
}

/* Authors ----------------------------------------------------------------- */

export const AUTHORS_QUERY = defineQuery(`
  *[_type == "author"] | order(name asc){ _id, name, position, image, slug, bio }
`);
export async function getAuthors() {
  return sanityClient.fetch(AUTHORS_QUERY);
}
