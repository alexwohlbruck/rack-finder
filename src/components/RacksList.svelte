<script>
  import { ListgroupItem, Button, P } from "flowbite-svelte";
  import { racks } from "../store/racks";

  function renderDistance(distanceInMeters) {
    if (!distanceInMeters) return "";

    const distanceInKm = distanceInMeters / 1000;

    if (distanceInKm < 1) {
      return `${Math.round(distanceInMeters)} m`;
    }
    return `${distanceInKm.toFixed(1)} km`;
  }
</script>

<div>
  {#each $racks as rack}
    <ListgroupItem class="border-b">
      <div class="flex items-center">
        <div class="flex-1 flex gap-4 items-center">
          <P size="xs" weight="medium">{renderDistance(rack?.distance)}</P>
          <div class="flex-1 flex flex-col">
            <P size="xs">{rack?.tags.bicycle_parking} style</P>
            <P size="xs">{rack?.tags.capacity} bike capacity</P>
          </div>
        </div>
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
      </div>
    </ListgroupItem>
  {/each}
</div>
