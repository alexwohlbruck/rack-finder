<script lang="ts">
  import { ListgroupItem, Button, P } from "flowbite-svelte";
  import { racks } from "../store/racks";
  import { type RackType } from "../types/OSM";
  import StandsIcon from "../lib/icons/Stands.svelte";
  import RackIcon from "../lib/icons/Rack.svelte";
  import BollardIcon from "../lib/icons/Bollard.svelte";
  import WaveIcon from "../lib/icons/Wave.svelte";
  import { setMapCenter } from "../store/map";

  function renderDistance(distanceInMeters) {
    if (!distanceInMeters) return "";

    const distanceInKm = distanceInMeters / 1000;

    if (distanceInKm < 1) {
      return `${Math.round(distanceInMeters)} m`;
    }
    return `${distanceInKm.toFixed(1)} km`;
  }

  function capitalize(str) {
    if (!str || !str.length) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function displayType(type: RackType) {
    if (!type) {
      return "Unknown type";
    }
    let friendlyName = type;
    switch (type) {
      case "staple":
        friendlyName = "Staple rack";
        break;
      case "wave":
        friendlyName = "Wave rack";
        break;
    }
    return capitalize(friendlyName);
  }

  function displayCapacity(capacity) {
    if (!capacity) {
      return "Unknown capacity";
    }
    return `${capacity} bicycle${capacity !== 1 ? "s" : ""}`;
  }

  function renderCoverage(coverage) {
    if (!coverage) {
      return "";
    }
    let friendlyName = coverage;
    switch (coverage) {
      case "yes":
        friendlyName = "Covered";
        break;
      case "partial":
        friendlyName = "Partially covered";
        break;
    }
    return capitalize(friendlyName);
  }

  function centerMapOnRack(rack) {
    setMapCenter({
      lat: rack.lat,
      lng: rack.lng,
    });
  }
</script>

<div>
  {#await $racks then racks}
    {#each racks as rack}
      <ListgroupItem class="border-b border-gray-200 dark:border-gray-700">
        <div class="flex gap-3 items-center">
          <Button on:click={() => centerMapOnRack(rack)} outline size="xs">
            {#if rack?.tags.bicycle_parking === "stands"}
              <StandsIcon />
            {:else if rack?.tags.bicycle_parking === "rack"}
              <RackIcon />
            {:else if rack?.tags.bicycle_parking === "bollard"}
              <BollardIcon />
            {:else if rack?.tags.bicycle_parking === "wave"}
              <WaveIcon />
            {:else}
              <StandsIcon />
            {/if}
          </Button>
          <div class="flex-1 flex gap-4 items-center">
            <div class="flex-1 flex flex-col">
              <P size="sm">
                {displayType(rack?.tags.bicycle_parking)}
              </P>
              <P size="sm">
                <span>{displayCapacity(rack?.tags.capacity)}</span>
                {#if rack?.tags.covered && rack.tags.covered !== "no"}
                  <span>
                    &bull;
                    {renderCoverage(rack?.tags.covered)}
                  </span>
                {/if}
              </P>
            </div>
          </div>
          <P size="sm" weight="medium" class="w-11 text-center">
            {renderDistance(rack?.distance)}
          </P>
        </div>
      </ListgroupItem>
    {/each}
  {/await}
</div>
