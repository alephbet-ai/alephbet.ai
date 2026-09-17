import { defineType, defineField } from "sanity";
import { FolderIcon } from "@sanity/icons/Folder";
import { seoGroup, seoFields } from "./shared/seoFields";

export const serviceGroupType = defineType({
  name: "serviceGroup",
  title: "Service Group",
  type: "document",
  icon: FolderIcon,
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
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alternative text" }),
      ],
    }),
    ...seoFields,
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
  },
});
