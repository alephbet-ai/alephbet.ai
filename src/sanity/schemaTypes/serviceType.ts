import { defineType, defineField, defineArrayMember } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";
import { seoGroup, seoFields } from "./shared/seoFields";

export const serviceType = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: CogIcon,
  // Manual ordering via `weight` (lower sorts first). Set as the default
  // ordering so the Studio lists show services in weight order.
  orderings: [
    {
      title: "Manual order (weight)",
      name: "weightAsc",
      by: [{ field: "weight", direction: "asc" }],
    },
  ],
  groups: [{ name: "content", title: "Content", default: true }, seoGroup],
  fields: [
    defineField({
      name: "serviceGroup",
      title: "Service group",
      type: "reference",
      group: "content",
      to: [{ type: "serviceGroup" }],
      validation: (rule) => rule.required(),
    }),
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
      name: "weight",
      title: "Weight (sort order)",
      type: "number",
      group: "content",
      description: "Lower numbers sort first within the service group.",
      initialValue: 0,
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
      name: "description",
      title: "Description",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "relatedInsights",
      title: "Related insights",
      type: "array",
      group: "content",
      description: "Optional — insights to feature alongside this service.",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "insight" }] }),
      ],
    }),
    ...seoFields,
  ],
  preview: {
    select: {
      title: "title",
      group: "serviceGroup.title",
      media: "coverImage",
    },
    prepare({ title, group, media }) {
      return { title, subtitle: group, media };
    },
  },
});
