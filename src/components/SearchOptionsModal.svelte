<script lang="ts">
  import { racksStore, setOptions } from "../store/racks";
  import {
    ButtonGroup,
    Heading,
    Label,
    Modal,
    Button as FlowbiteButton,
    Select,
    MultiSelect,
    P,
    Range,
  } from "flowbite-svelte";
  import { RackTypes } from "../types/rack";
  import { camelcaseToWords, renderDistance } from "../util";
  import Button from "../lib/Button.svelte";

  export let open;
  let sort, filter;

  $: sort = $racksStore.sort;
  $: filter = $racksStore.filter;

  // Auto update
  $: {
    setOptions({ sort, filter });
  }

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
</script>

<Modal bind:open outsideclose>
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

  <Label for="covered">Hide rack types</Label>
  <MultiSelect
    bind:value={filter.ignoreType}
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
    <Button on:click={() => (open = false)}>Done</Button>
  </div>
</Modal>

<style lang="scss">
  // Idk wtf happened with this dropdown, simple style fix
  :global(div[role="listbox"] .absolute) {
    z-index: 1;
    @media (prefers-color-scheme: light) {
      background-color: white;
    }
  }
</style>
