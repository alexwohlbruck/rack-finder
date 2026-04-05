<script lang="ts">
  import { ListgroupItem, P } from "flowbite-svelte";
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import { racks } from "../store/racks";
  import {
    type RackCoverage,
    type RackAccess,
    type RackType,
  } from "../types/rack";
  import RackIcon from "../lib/icons/RackIcon.svelte";
  import { renderDistance } from "../util";
  import { preferredUnits } from "../store/prefs";
  import { t } from "../i18n/index";
  import { RACKS_LAYER_MAX_ZOOM } from "./Map/map.config";
  import { mapStore } from "../store/map";

  function renderType(type: RackType): string {
    if (!type) return $t("rack.type.unknown");
    // TODO: Add fallback for unknown types
    return $t(`rack.type.${type}`);
  }

  function renderCapacity(capacity: string) {
    if (!capacity) return null;
    return $t("rack.capacity", { count: parseInt(capacity) });
  }

  function renderCoverage(coverage: RackCoverage) {
    if (!coverage || coverage === "no") return null;
    return $t(`rack.covered.${coverage}`);
  }

  function renderAccess(access: RackAccess) {
    if (!access || access === "yes") return null;
    return $t(`rack.access.${access}`);
  }

  function renderIndoor(indoor: string) {
    if (indoor === "yes") {
      return $t("rack.indoor.yes");
    }
    return null;
  }

  function renderDetails(tags) {
    const indoor = renderIndoor(tags.indoor);
    const coverage = renderCoverage(tags.covered);
    const access = renderAccess(tags.access);
    const capacity = renderCapacity(tags.capacity);
    return [indoor, coverage, access, capacity]
      .filter(Boolean)
      .join(" • ");
  }
</script>

{#if !$racks.length}
  <div class="h-full flex items-center justify-center">
    <P size="sm">
      {$t("nearbyRacksPanel.nothingNearby")}
      {#if $mapStore.zoom < RACKS_LAYER_MAX_ZOOM}
        {$t("nearbyRacksPanel.zoomIn")}
      {/if}
    </P>
  </div>
{:else}
  <div class="flex flex-col h-full">
    <VirtualList items={$racks} let:item>
      <ListgroupItem
        key={item.id}
        class="flex items-center border-b border-gray-200 dark:border-gray-700"
      >
        <a href={`#/racks/${item.id}`} class="w-full">
          <div class="flex gap-3 items-center">
            <div class="py-2 mr-1">
              <RackIcon
                name={item?.tags.bicycle_parking}
                capacity={item?.tags.capacity}
              />
            </div>
            <div class="flex-1 flex gap-4 items-center">
              <div class="flex-1 flex flex-col">
                <P size="sm" weight="medium">
                  {renderType(item?.tags.bicycle_parking)}
                </P>
                <P size="sm">
                  {renderDetails(item?.tags)}
                </P>
              </div>
            </div>
            <P size="sm" weight="medium" class="w-11 text-center">
              {renderDistance(item?.distance, $preferredUnits)}
            </P>
          </div>
        </a>
      </ListgroupItem>
    </VirtualList>
  </div>
{/if}
