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

  function renderType(type: RackType): string {
    if (!type) return "Unknown type";
    let name: string = type;
    switch (type) {
      case "staple":
        name = "Staple rack";
        break;
      case "wave":
        name = "Wave rack";
        break;
    }
    return friendlyName(name);
  }

  function renderCapacity(capacity: number) {
    if (!capacity) {
      return null;
    }
    return `${capacity} bicycle${capacity !== 1 ? "s" : ""}`;
  }

  function renderCoverage(coverage: RackCoverage) {
    if (!coverage) return null;
    let friendlyName: string = coverage;
    switch (coverage) {
      case "yes":
        friendlyName = "Covered";
        break;
      case "partial":
        friendlyName = "Partially covered";
        break;
      case "no":
        return null;
    }
    return capitalize(friendlyName);
  }

  function renderTraffic(traffic: RackTraffic) {
    if (!traffic) return null;
    if ((traffic = "none")) return "No foot traffic";
    return `${capitalize(traffic)} foot traffic`;
  }

  function renderPrivacy(isPrivate: RackPrivate) {
    if (!isPrivate || isPrivate === "no") return null;
    if (isPrivate === "Permissive") return "Permissive access";
    return capitalize(isPrivate);
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
