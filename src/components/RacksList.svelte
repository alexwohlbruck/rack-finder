<script>
  import { A, Listgroup, ListgroupItem, Button } from "flowbite-svelte";
  import { racks } from "../store/racks";
</script>

<div>
  {#each $racks as rack}
    <ListgroupItem class="border-b">
      <div class="flex items-center">
        <div class="flex-1 flex flex-col">
          <span>{rack?.tags.bicycle_parking} style</span>
          <span>{rack?.tags.capacity} bike capacity</span>
          <span>{Math.round(rack?.distance / 100) / 10} km away</span>
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
