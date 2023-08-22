<script lang="ts">
  import { Card, Heading, Button as FlowbiteButton, P } from "flowbite-svelte";
  import RacksList from "./RacksList.svelte";
  import { racks } from "../store/racks";
  import SearchOptionsModal from "./SearchOptionsModal.svelte";

  let searchOptionsModal = false;
</script>

<SearchOptionsModal bind:open={searchOptionsModal} />

<Card padding="none" class="flex-1 flex flex-col overflow-x-hidden">
  <div class="p-4 flex gap-2 justify-between items-center">
    <div>
      <Heading tag="h6">Nearby racks</Heading>
      <P size="xs" weight="medium"
        >{$racks.length} matching result{$racks.length !== 1 ? "s" : ""}</P
      >
    </div>
    <FlowbiteButton
      on:click={() => (searchOptionsModal = true)}
      outline
      color="primary"
      size="xs"
    >
      <svg
        class="w-4 h-4 mr-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"
        />
      </svg>
      Sort/Filter
    </FlowbiteButton>
  </div>

  <div
    class="flex-1 overflow-y-auto overflow-x-hidden border-t border-gray-200 dark:border-gray-700"
  >
    <RacksList />
  </div>
</Card>
