<script lang="ts">
  import { ListgroupItem, Button, P } from "flowbite-svelte";
  import { racks } from "../store/racks";
  import {
    type RackCoverage,
    type RackAccess,
    type RackTraffic,
    type RackType,
  } from "../types/rack";
  import RackIcon from "../lib/icons/RackIcon.svelte";
  import { setMapCenter } from "../store/map";
  import { capitalize, renderDistance, friendlyName } from "../util";
  import { preferredUnits } from "../store/prefs";
  import { t } from "../i18n/index";

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
    if (!coverage) return null;
    return $t(`rack.covered.${coverage}`);
  }

  function renderTraffic(traffic: RackTraffic) {
    if (!traffic) return null;
    return $t(`rack.traffic.${traffic}`);
  }

  function renderAccess(access: RackAccess) {
    if (!access || access === "yes") return null;
    return $t(`rack.access.${access}`);
  }

  function renderDetails(tags) {
    const capacity = renderCapacity(tags.capacity);
    const coverage = renderCoverage(tags.covered);
    const traffic = renderTraffic(tags.traffic);
    const access = renderAccess(tags.access);
    return [access, traffic, coverage, capacity].filter(Boolean).join(" • ");
  }

  function centerMapOnRack(rack) {
    setMapCenter({
      lat: rack.lat,
      lng: rack.lng,
    });
  }
</script>

{#if !$racks.length}
  <div class="h-full flex items-center justify-center">
    <P size="sm">Nothing nearby!</P>
  </div>
{:else}
  <div class="flex flex-col">
    {#each $racks as rack, i}
      <ListgroupItem
        key={rack.id}
        class="flex items-center border-b border-gray-200 dark:border-gray-700"
      >
        <a href={`#/racks/${rack.id}`} class="w-full">
          <div class="flex gap-3 items-center">
            <div class="py-2 mr-1">
              <RackIcon
                name={rack?.tags.bicycle_parking}
                capacity={rack?.tags.capacity}
              />
            </div>
            <div class="flex-1 flex gap-4 items-center">
              <div class="flex-1 flex flex-col">
                <P size="sm" weight="medium">
                  {renderType(rack?.tags.bicycle_parking)}
                </P>
                <P size="sm">
                  {renderDetails(rack?.tags)}
                </P>
              </div>
            </div>
            <P size="sm" weight="medium" class="w-11 text-center">
              {renderDistance(rack?.distance, $preferredUnits)}
            </P>
          </div>
        </a>
      </ListgroupItem>
    {/each}
  </div>
{/if}
