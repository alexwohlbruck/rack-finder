<script lang="ts">
  import { Card } from "flowbite-svelte";
  import Map from "./components/Map/Map.svelte";
  import LocationPermissionModal from "./components/LocationPermissionModal.svelte";
  import ContributeRackModal from "./components/ContributeRackModal.svelte";
  import RackDetail from "./components/RackDetail.svelte";
  import { racksStore } from "./store/racks";
  import NearbyRacksPanel from "./components/NearbyRacksPanel.svelte";

  console.log(NearbyRacksPanel);

  let locateUserOnMap;
  let contributePanel = false;

  function locateUser() {
    locateUserOnMap();
  }

  function toggleContributePanel(e, open?: boolean) {
    contributePanel = open ?? !contributePanel;
  }
</script>

<main class="h-screen p-2">
  <div class="h-full flex gap-2 items-stretch">
    <LocationPermissionModal on:locateUser={locateUser} />

    <div class="flex flex-col gap-2">
      {#if contributePanel}
        <ContributeRackModal />
      {/if}
      <NearbyRacksPanel on:openContributeModal={toggleContributePanel} />
      {#if $racksStore.selectedRack}
        <RackDetail />
      {/if}
    </div>

    <Card padding="none" class="flex-auto max-w-none overflow-hidden">
      <Map bind:locateUser={locateUserOnMap} />
    </Card>
  </div>
</main>
