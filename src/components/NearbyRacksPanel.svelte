<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Card, Heading, P } from "flowbite-svelte";
  import RacksList from "./RacksList.svelte";
  import Button from "../lib/Button.svelte";
</script>

<Card padding="none" class="flex flex-col overflow-x-hidden">
  <div class="p-4 flex gap-2 justify-between items-center">
    <Heading tag="h5">Nearby racks</Heading>
  </div>

  <div
    class="flex-1 overflow-x-hidden border-t border-gray-200 dark:border-gray-700"
  >
    <RacksList />
  </div>
</Card>
