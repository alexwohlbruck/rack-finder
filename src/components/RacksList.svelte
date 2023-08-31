<script lang="ts">
  import { ListgroupItem, Button, P } from "flowbite-svelte";
  import { racks } from "../store/racks";
  import {
    type RackCoverage,
    type RackPrivate,
    type RackTraffic,
    type RackType,
  } from "../types/rack";
  import RackIcon from "../lib/icons/RackIcon.svelte";
  import { setMapCenter } from "../store/map";
  import { capitalize, renderDistance, friendlyName } from "../util";
  import { preferredUnits } from "../store/prefs";
  import { t } from "../i18n/index";

  function renderType(type: RackType): string {
    if (!type) return "Unknown type";
    // TODO: Add fallback for unknown types
    return $t(`rack.type.${type}`);
  }

  function renderCapacity(capacity: string) {
    if (!capacity) return null;
    return $t("racksList.capacity", { count: parseInt(capacity) });
  }

  function renderCoverage(coverage: RackCoverage) {
    if (!coverage) return null;
    return $t(`rack.covered.${coverage}`);
  }

  function renderTraffic(traffic: RackTraffic) {
    if (!traffic) return null;
    return $t(`rack.traffic.${traffic}`);
  }

  function renderPrivacy(_private: RackPrivate) {
    if (!_private || _private === "no") return null;
    return $t(`rack.private.${_private}`);
  }

  function renderDetails(tags) {
    const capacity = renderCapacity(tags.capacity);
    const coverage = renderCoverage(tags.covered);
    const traffic = renderTraffic(tags.traffic);
    const privacy = renderPrivacy(tags.private);
    return [privacy, traffic, coverage, capacity].filter(Boolean).join(" • ");
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
  <div>
    {#each $racks as rack}
      <ListgroupItem class="border-b border-gray-200 dark:border-gray-700">
        <div class="flex gap-3 items-center">
          <Button
            on:click={() => centerMapOnRack(rack)}
            outline
            size="xs"
            class="!w-9 !h-9 !p-0"
          >
            <RackIcon name={rack?.tags.bicycle_parking} />
          </Button>
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
      </ListgroupItem>
    {/each}
  </div>
{/if}
