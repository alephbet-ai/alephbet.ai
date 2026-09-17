import { defineType, defineField, defineArrayMember } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { seoGroup, seoFields } from "./shared/seoFields";

export const serviceType = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: CogIcon,
  // Manual drag-and-drop sorting: the plugin stores the sort key in `orderRank`
  // and the reorder UI lives in the "Services" Structure list (see structure.ts).
  orderings: [orderRankOrdering],
  groups: [{ name: "content", title: "Content", default: true }, seoGroup],
  fields: [
    orderRankField({ type: "service" }),
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
