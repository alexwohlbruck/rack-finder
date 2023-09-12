<script lang="ts">
  import { Alert, Heading, P, Button as FlowbiteButton } from "flowbite-svelte";
  import Button from "../../lib/Button.svelte";
  import {
    getCurrentLocation,
    getLocationPermissionStatus,
    type LocationPermissionStatus,
  } from "../../services/geolocation";
  import { createEventDispatcher } from "svelte";
  import { completeOnboarding } from "../../store/prefs";
  import { Icon } from "flowbite-svelte-icons";

  let status: LocationPermissionStatus = "prompt";
  const dispatch = createEventDispatcher();

  function locationGranted() {
    status = "granted";
    completeOnboarding();
    setTimeout(() => {
      dispatch("locateUser");
    }, 0);
  }

  async function requestLocation() {
    try {
      const location = await getCurrentLocation();
      if (location) {
        locationGranted();
      }
    } catch {
      status = await getLocationPermissionStatus();
    }
  }

  function skip() {
    completeOnboarding();
  }
</script>

<div class="flex flex-col gap-5 items-center">
  <Icon name="map-pin-solid" class="w-12 h-12 text-sky-500" />
  <div class="flex flex-col gap-2">
    <Heading tag="h5" class="text-center">
      Share your location to get started
    </Heading>
    <P size="sm" class="text-center">
      Your location data will not be uploaded or shared with anyone. It is kept
      locally on your device.
    </P>
  </div>
  {#if status === "denied"}
    <Alert class="text-center">
      <span class="font-medium"
        >Location permission denied! Check the site settings in your browser.</span
      >
    </Alert>
  {:else}
    <div class="flex gap-2">
      <Button size="sm" on:click={requestLocation}>Grant permission</Button>
      <FlowbiteButton outline size="sm" on:click={skip}>Skip</FlowbiteButton>
    </div>
  {/if}
</div>
