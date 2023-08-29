<script lang="ts">
  import {
    Card,
    Heading,
    Input,
    Label,
    P,
    Select,
    Spinner,
    Button as FlowbiteButton,
  } from "flowbite-svelte";
  import Button from "../lib/Button.svelte";
  import { mapStore, toggleContributeMode } from "../store/map";

  import { submitBikeRack } from "../services/osm";
  import { get } from "svelte/store";
  import type { BikeRackTags } from "../types/osm";

  let loading = false;

  const rackTypeOptions = [
    {
      value: "stands",
      name: "Stands",
    },
    {
      value: "wave",
      name: "Wave",
    },
    {
      value: "bollard",
      name: "Bollard",
    },
    {
      value: "rack",
      name: "Rack",
    },
    {
      value: "wall_loops",
      name: "Wall loops",
    },
    {
      value: "building",
      name: "Building",
    },
    {
      value: "two_tier",
      name: "Two tier",
    },
  ];
  const coverageOptions = [
    {
      value: "no",
      name: "Exposed",
    },
    {
      value: "yes",
      name: "Covered",
    },
    {
      value: "partial",
      name: "Partially covered",
    },
  ];

  const form: BikeRackTags = {
    bicycle_parking: "stands",
    capacity: 2,
    covered: "no",
  };

  async function submit() {
    const mapCenter = get(mapStore).center;
    const payload = {
      lat: mapCenter.lat,
      lng: mapCenter.lng,
      tags: form,
    };
    loading = true;
    await submitBikeRack(payload);
    toggleContributeMode(false);
    loading = false;
  }
</script>

<Card padding="md" class="flex flex-1 flex-col gap-4">
  <div class="flex items-start">
    <div class="flex-1">
      <Heading tag="h5">Contribute new bike rack</Heading>
      <P size="sm">Drag the marker to the location of the rack</P>
    </div>
    <FlowbiteButton
      size="xs"
      outline
      class="py-3"
      on:click={() => toggleContributeMode(false)}
    >
      <svg
        class="w-3 h-3 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </FlowbiteButton>
  </div>

  <Label for="type">
    <div class="mb-1">Type</div>
    <Select
      bind:value={form.bicycle_parking}
      id="type"
      items={rackTypeOptions}
      required
    />
  </Label>

  <Label for="capacity">
    <div class="mb-1">Capacity</div>
    <Input
      bind:value={form.capacity}
      id="capacity"
      type="number"
      required
      min="1"
    />
  </Label>

  <Label for="covered">
    <div class="mb-1">Rain cover</div>
    <Select
      bind:value={form.covered}
      id="covered"
      items={coverageOptions}
      required
    />
  </Label>

  <div class="flex-1" />
  <Button on:click={submit}>
    {#if loading}
      <Spinner class="mr-3" size="5" color="gray" />
    {/if}
    Add to map
  </Button>
</Card>
