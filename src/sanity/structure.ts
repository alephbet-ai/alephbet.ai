import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons/Cog";
import { apiVersion } from "./env";

// Custom Studio Structure: "Services" opens a list of Service Groups, and each
// group opens that group's services ordered by `weight` (lower sorts first).
// This keeps services grouped by Service Group without an extra plugin.
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
                S.listItem()
                  .id(`service-group-${group._id}`)
                  .title(group.title || "Untitled group")
                  .icon(CogIcon)
                  .child(
                    S.documentList()
                      .id(`services-${group._id}`)
                      .title(group.title || "Untitled group")
                      .filter('_type == "service" && serviceGroup._ref == $groupId')
                      .params({ groupId: group._id })
                      .defaultOrdering([{ field: "weight", direction: "asc" }]),
                  ),
              ),
            );
        }),
      S.divider(),
      // Everything else as normal document lists (service is shown above).
      ...S.documentTypeListItems().filter((item) => item.getId() !== "service"),
    ]);
