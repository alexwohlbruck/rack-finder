<script lang="ts">
  import { Card } from "flowbite-svelte";
  import Map from "./components/Map/Map.svelte";
  import LocationPermissionModal from "./components/LocationPermissionModal.svelte";
  import ContributeRackPanel from "./components/ContributeRackPanel.svelte";
  import RackDetail from "./components/RackDetail.svelte";
  import { racksStore } from "./store/racks";
  import NearbyRacksPanel from "./components/NearbyRacksPanel.svelte";
  import UserPanel from "./components/UserPanel.svelte";
  import { mapStore } from "./store/map";
  import Toast from "./lib/Toast.svelte";

  let locateUserOnMap;
  $: contributeMode = $mapStore.contributeMode;

  function locateUser() {
    locateUserOnMap();
  }
</script>

<LocationPermissionModal on:locateUser={locateUser} />
<Toast />

<main class="h-screen p-2">
  <div class="h-full flex flex-col-reverse md:flex-row md- gap-2 items-stretch">
    <div
      class="side-panel flex flex-col gap-2 h-3/5 md:h-auto md:w-1/3 lg:w-1/4"
    >
      {#if contributeMode}
        <ContributeRackPanel />
      {:else}
        <NearbyRacksPanel />
      {/if}

      {#if $racksStore.selectedRack}
        <RackDetail />
      {/if}
      <UserPanel />
    </div>

    <Card padding="none" class="flex-auto max-w-none overflow-hidden">
      <Map bind:locateUser={locateUserOnMap} />
    </Card>
  </div>
</main>

<style>
  .side-panel > :global(div) {
    max-width: none;
  }
</style>
