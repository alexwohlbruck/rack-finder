<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Card, P } from "flowbite-svelte";
  import RacksList from "./RacksList.svelte";
  import Button from "../lib/Button.svelte";

  export let contributeModalDispatcher = createEventDispatcher();

  function openContributeModal() {
    contributeModalDispatcher("openContributeModal");
  }
</script>

<Card class="flex-1 overflow-y-scroll overflow-x-hidden">
  <div class="flex flex-col gap-3">
    <div class="flex justify-between items-center">
      <P class="text-2xl font-bold">Nearby racks</P>
      <Button on:click={openContributeModal}>Contribute</Button>
    </div>
    <RacksList />
  </div>
</Card>
