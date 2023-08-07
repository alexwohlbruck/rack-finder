<script lang="ts">
  import {
    Card,
    Checkbox,
    Heading,
    Input,
    Label,
    P,
    Select,
    Spinner,
    Toast,
  } from "flowbite-svelte";
  import Button from "../lib/Button.svelte";
  import { mapStore, toggleContributeMode } from "../store/map";

  import { submitBikeRack } from "../services/osm";
  import { get } from "svelte/store";
  import type { BikeRackTags } from "../types/OSM";

  let loading = false;
  let showToast = false;

  const rackTypeOptions = [
    {
      value: "stands",
      name: "Stands",
    },
    {
      value: "wall_loops",
      name: "Wall loops",
    },
    {
      value: "bollard",
      name: "Bollard",
    },
    {
      value: "building",
      name: "Building",
    },
    {
      value: "two_tier",
      name: "Two tier",
    },
    {
      value: "wave",
      name: "Wave",
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
    showToast = true;
    setTimeout(() => {
      showToast = false;
    }, 3000);
  }
</script>

{#if showToast}
  <Toast
    color="green"
    class="max-w-md absolute z-50 bottom-5 left-1/2 transform -translate-x-1/2"
  >
    <svelte:fragment slot="icon">
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="sr-only">Check icon</span>
    </svelte:fragment>
    Thanks! This rack will show on the map soon.
  </Toast>
{/if}

<Card class="flex flex-1 flex-col gap-4">
  <div>
    <Heading tag="h5">Contribute new rack</Heading>
    <P>Drag the marker to the location of the rack</P>
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
