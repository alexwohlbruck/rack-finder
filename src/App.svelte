<script>
  import { Card } from "flowbite-svelte";
  import Map from "./components/Map.svelte";
  import RacksList from "./components/RacksList.svelte";
</script>

<main class="h-screen p-2">
  <div class="h-full flex gap-2 items-stretch">
    <Card class="flex-1 overflow-scroll">
      <RacksList />
    </Card>
    <Card padding="none" class="flex-auto max-w-none overflow-hidden">
      <Map />
    </Card>
  </div>
</main>
