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
  } from "flowbite-svelte";
  import Button from "../lib/Button.svelte";
  import { mapStore, toggleContributeMode } from "../store/map";

  import { submitBikeRack } from "../services/osm";
  import { get } from "svelte/store";
  import type { BikeRackTags } from "../types/OSM";

  let loading = false;

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
  }
</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore missing-declaration -->
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
    {#if !loading}
      <Spinner class="mr-3" size="5" color="gray" />
    {/if}
    Add to map
  </Button>
</Card>
