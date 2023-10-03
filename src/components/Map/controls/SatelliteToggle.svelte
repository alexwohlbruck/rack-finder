<script>
  import { Toggle } from "flowbite-svelte";
  import { mapStore, toggleSatellite } from "../../../store/map";

  $: satellite = $mapStore.satellite;

  let toggleValue = false;

  $: {
    toggleSatellite(toggleValue);
  }

  function syncLocalValue(storeValue) {
    if (toggleValue !== storeValue) {
      toggleValue = storeValue;
    }
  }

  $: {
    syncLocalValue(satellite);
  }
</script>

<div class="absolute top-0 left-0 z-10 p-[.6rem]">
  <Toggle bind:checked={toggleValue} />
</div>
