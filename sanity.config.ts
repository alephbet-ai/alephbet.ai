import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { CogIcon } from "@sanity/icons/Cog";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { projectId, dataset, apiVersion } from "./src/sanity/env";

// Studio configuration. When embedded via @sanity/astro it is mounted at the
// integration's `studioBasePath` (/studio); `sanity dev` also reads this file.
export default defineConfig({
  name: "default",
  title: "alephbet.ai",
  projectId,
  dataset,
  plugins: [
    structureTool({
      // Services get a drag-to-reorder list; everything else is a normal list.
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            orderableDocumentListDeskItem({
              type: "service",
              title: "Services (drag to reorder)",
              icon: CogIcon,
              S,
              context,
            }),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== "service",
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
});
