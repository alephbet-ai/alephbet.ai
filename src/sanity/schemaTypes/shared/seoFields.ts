import { defineField, defineArrayMember } from "sanity";
import { SearchIcon } from "@sanity/icons/Search";

// Reusable "SEO" field group + fields. Add `seoGroup` to a document's `groups`
// and spread `seoFields` into its `fields` so they render on a dedicated tab.
// These are plain top-level document fields (groups only affect Studio UI), so
// query them at the document root: { metaTitle, metaDescription, ... }.
export const seoGroup = { name: "seo", title: "SEO", icon: SearchIcon };

export const seoFields = [
  defineField({
    name: "metaTitle",
    title: "Meta title",
    type: "string",
    group: "seo",
    description: "Overrides the document title in search results and tabs.",
    validation: (rule) => rule.max(60).warning("Aim for under 60 characters"),
  }),
  defineField({
    name: "metaDescription",
    title: "Meta description",
    type: "text",
    rows: 3,
    group: "seo",
    validation: (rule) => rule.max(160).warning("Aim for under 160 characters"),
  }),
  defineField({
    name: "ogImage",
    title: "Social share image",
    type: "image",
    group: "seo",
    description: "Open Graph / Twitter card image (ideally 1200×630).",
    options: { hotspot: true },
  }),
  defineField({
    name: "keywords",
    title: "Keywords",
    type: "array",
    of: [defineArrayMember({ type: "string" })],
    options: { layout: "tags" },
    group: "seo",
  }),
  defineField({
    name: "canonicalUrl",
    title: "Canonical URL",
    type: "url",
    group: "seo",
    description: "Set when this content canonically lives at another URL.",
  }),
  defineField({
    name: "noIndex",
    title: "Hide from search engines (noindex)",
    type: "boolean",
    group: "seo",
    initialValue: false,
  }),
];
