import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons/User";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "position",
      title: "Position / role",
      type: "string",
    }),
    defineField({
      // Kept for linking to an author page on the website.
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "position", media: "image" },
  },
});
