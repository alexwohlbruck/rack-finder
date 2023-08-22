<script lang="ts">
  import {
    ButtonGroup,
    Card,
    Heading,
    Button as FlowbiteButton,
    Range,
    MultiSelect,
    Label,
    Modal,
    P,
    Select,
  } from "flowbite-svelte";
  import RacksList from "./RacksList.svelte";
  import Button from "../lib/Button.svelte";
  import { RackTypes } from "../types/Rack";
  import { renderDistance } from "../util";
  import { racks, racksStore, setOptions } from "../store/racks";

  function camelcaseToWords(str) {
    const spaces = str.split("_").join(" ");
    return spaces.charAt(0).toUpperCase() + spaces.slice(1);
  }

  let optionsModal = false;

  let sort, filter;
  $: sort = $racksStore.sort;
  $: filter = $racksStore.filter;

  let filterOptions = {
    type: RackTypes.map((type) => ({
      value: type,
      name: camelcaseToWords(type),
    })),
    covered: [
      { value: "yes", name: "Covered" },
      { value: "partial", name: "Partially covered" },
      { value: "no", name: "Exposed" },
    ],
  };

  function toggleSortDirection() {
    sort.direction = sort.direction === "asc" ? "desc" : "asc";
  }

  function applyOptions() {
    setOptions({ sort, filter });
    optionsModal = false;
  }
</script>

<Modal bind:open={optionsModal} outsideclose>
  <Heading tag="h5">Sort and filter</Heading>

  <Label for="sortBy">Sort by</Label>

  <ButtonGroup class="w-full !mt-0">
    <FlowbiteButton class="w-10 !p-0 mt-2" on:click={toggleSortDirection}>
      <svg
        class="w-3 h-3 transition-transform"
        class:rotate-180={sort.direction === "desc"}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13V1m0 0L1 5m4-4 4 4"
        />
      </svg>
    </FlowbiteButton>
    <Select bind:value={sort.by} id="sortBy" class="!mt-2 rounded-l-none">
      <option value="distance">Distance</option>
      <option value="capacity">Capacity</option>
    </Select>
  </ButtonGroup>

  <Label for="covered">Rack type</Label>
  <MultiSelect
    bind:value={filter.type}
    id="covered"
    items={filterOptions.type}
    class="!mt-2"
  />

  <Label for="covered">Rain coverage</Label>
  <MultiSelect
    bind:value={filter.covered}
    id="covered"
    items={filterOptions.covered}
    class="!mt-2"
  />

  <Label>Minimum capacity</Label>
  <div class="flex gap-3 items-center !mt-2">
    <P>{filter.minCapacity}</P>
    <Range bind:value={filter.minCapacity} id="range1" min="1" max="100" />
  </div>

  <Label>Maximum distance</Label>
  <div class="flex gap-3 items-center !mt-2">
    <P class="w-14">
      {filter.maxDistance === 10001
        ? "Any"
        : renderDistance(filter.maxDistance)}
    </P>
    <Range bind:value={filter.maxDistance} id="range2" min="10" max="10001" />
  </div>

  <div class="flex justify-end">
    <Button on:click={applyOptions}>Apply</Button>
  </div>
</Modal>

<Card padding="none" class="flex-1 flex flex-col overflow-x-hidden">
  <div class="p-4 flex gap-2 justify-between items-center">
    <div>
      <Heading tag="h6">Nearby racks</Heading>
      <P size="xs" weight="medium"
        >{$racks.length} matching result{$racks.length !== 1 ? "s" : ""}</P
      >
    </div>
    <FlowbiteButton
      on:click={() => (optionsModal = true)}
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

<style>
  :global(div[role="listbox"] .absolute) {
    z-index: 1;
  }
</style>
