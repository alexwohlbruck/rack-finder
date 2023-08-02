<script lang="ts">
  import { Card, P } from "flowbite-svelte";
  import Map from "./components/Map.svelte";
  import RacksList from "./components/RacksList.svelte";
  import LocationPermissionModal from "./components/LocationPermissionModal.svelte";

  let locateUserOnMap;
  function locateUser() {
    locateUserOnMap();
  }
</script>

<main class="h-screen p-2">
  <div class="h-full flex gap-2 items-stretch">
    <!-- Allow LocationPermissionModal to call locateUser -->
    <LocationPermissionModal on:locateUser={locateUser} />

    <Card class="flex-1 overflow-scroll">
      <div class="flex flex-col gap-3">
        <P class="text-2xl font-bold">Nearby racks</P>
        <RacksList />
      </div>
    </Card>
    <Card padding="none" class="flex-auto max-w-none overflow-hidden">
      <Map bind:locateUser={locateUserOnMap} />
    </Card>
  </div>
</main>
