import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons/Cog";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { apiVersion } from "./env";

// Custom Studio Structure: "Services" opens a list of Service Groups, and each
// group opens a drag-to-reorder list of just that group's services. So services
// are grouped by Service Group while keeping manual (orderRank) ordering.
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .id("services")
        .title("Services")
        .icon(CogIcon)
        .child(async () => {
          const client = context.getClient({ apiVersion });
          const groups = await client.fetch<{ _id: string; title: string }[]>(
            `*[_type == "serviceGroup"] | order(title asc){ _id, title }`,
          );
          return S.list()
            .id("services-by-group")
            .title("Services by group")
            .items(
              groups.map((group) =>
                orderableDocumentListDeskItem({
                  type: "service",
                  id: `services-${group._id}`,
                  title: group.title || "Untitled group",
                  filter: "serviceGroup._ref == $groupId",
                  params: { groupId: group._id },
                  S,
                  context,
                }),
              ),
            );
        }),
      S.divider(),
      // Everything else as normal document lists (service is shown above).
      ...S.documentTypeListItems().filter((item) => item.getId() !== "service"),
    ]);
