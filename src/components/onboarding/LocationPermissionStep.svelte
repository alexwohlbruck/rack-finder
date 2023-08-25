<script lang="ts">
  import { Alert, Heading, P } from "flowbite-svelte";
  import Button from "../../lib/Button.svelte";
  import {
    getCurrentLocation,
    getLocationPermissionStatus,
    type LocationPermissionStatus,
  } from "../../services/geolocation";
  import { createEventDispatcher } from "svelte";
  import { completeOnboarding } from "../../store/prefs";

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
</script>

<div class="flex flex-col gap-5 items-center">
  <svg
    class="mx-auto w-14 h-14 dark:text-gray-200 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 14 20"
  >
    <path
      d="M7 0a7 7 0 0 0-1 13.92V19a1 1 0 1 0 2 0v-5.08A7 7 0 0 0 7 0Zm0 5.5A1.5 1.5 0 0 0 5.5 7a1 1 0 0 1-2 0A3.5 3.5 0 0 1 7 3.5a1 1 0 0 1 0 2Z"
    />
  </svg>
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
    </div>
  {/if}
</div>
