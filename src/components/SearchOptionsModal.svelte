<script lang="ts">
  import {
    MAX_DISTANCE_IMPERIAL,
    MAX_DISTANCE_METRIC,
    searchOptionsStore,
    setOptions,
  } from "../store/racks";
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
  import { preferredUnits } from "../store/prefs";

  export let open;
  $: sort = $searchOptionsStore.sort;
  $: filter = $searchOptionsStore.filter;
  $: maxDistance =
    $preferredUnits === "metric"
      ? MAX_DISTANCE_METRIC + 1
      : MAX_DISTANCE_IMPERIAL + 1;
  $: minDistance = $preferredUnits === "metric" ? 10 : 32;

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
      {filter.maxDistance === maxDistance
        ? "Any"
        : renderDistance(filter.maxDistance, $preferredUnits)}
    </P>
    <Range
      bind:value={filter.maxDistance}
      id="range2"
      min={minDistance}
      max={maxDistance}
    />
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
