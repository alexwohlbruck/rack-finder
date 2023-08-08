<script lang="ts">
  import { ListgroupItem, Button, P } from "flowbite-svelte";
  import { racks } from "../store/racks";
  import { type RackType } from "../types/OSM";

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
</script>

<div>
  {#each $racks as rack}
    <ListgroupItem class="border-b border-gray-200 dark:border-gray-700">
      <div class="flex gap-3 items-center">
        <Button color="alternative" size="xs">
          <svg
            class="w-4 h-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 14 20"
          >
            <path
              d="M7 0a7 7 0 0 0-1 13.92V19a1 1 0 1 0 2 0v-5.08A7 7 0 0 0 7 0Zm0 5.5A1.5 1.5 0 0 0 5.5 7a1 1 0 0 1-2 0A3.5 3.5 0 0 1 7 3.5a1 1 0 0 1 0 2Z"
            />
          </svg>
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
</div>
