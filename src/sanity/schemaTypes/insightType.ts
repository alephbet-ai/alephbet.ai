import { defineType, defineField, defineArrayMember } from "sanity";
import { BulbOutlineIcon } from "@sanity/icons/BulbOutline";
import { seoGroup, seoFields } from "./shared/seoFields";

export const insightType = defineType({
  name: "insight",
  title: "Insight",
  type: "document",
  icon: BulbOutlineIcon,
  groups: [{ name: "content", title: "Content", default: true }, seoGroup],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      group: "content",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alternative text" }),
      ],
    }),
    defineField({
      name: "teaser",
      type: "text",
      rows: 3,
      group: "content",
      description: "Short summary used in listings and cards.",
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "tldr",
      title: "TL;DR",
      type: "blockContent",
      group: "content",
      description: "A brief rich-text summary.",
    }),
    defineField({
      name: "body",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "tags",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    ...seoFields,
  ],
  preview: {
    select: { title: "title", author: "author.name", media: "coverImage" },
    prepare({ title, author, media }) {
      return { title, subtitle: author ? `by ${author}` : undefined, media };
    },
  },
});
