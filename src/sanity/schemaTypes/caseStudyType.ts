import { defineType, defineField } from "sanity";
import { CaseIcon } from "@sanity/icons/Case";
import { seoGroup, seoFields } from "./shared/seoFields";

export const caseStudyType = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  icon: CaseIcon,
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
      name: "body",
      type: "blockContent",
      group: "content",
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
