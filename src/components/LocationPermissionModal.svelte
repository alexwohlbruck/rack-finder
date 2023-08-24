<script lang="ts">
  import { Modal, Alert, P } from "flowbite-svelte";
  import Button from "../lib/Button.svelte";
  import {
    getCurrentLocation,
    getLocationPermissionStatus,
  } from "../services/geolocation";
  import { createEventDispatcher, onMount } from "svelte";

  export let open = false;

  onMount(async () => {
    await checkLocationPermissionStatus();
  });

  type LocationPermissionStatus = "granted" | "denied" | "prompt";
  let status: LocationPermissionStatus = "granted";
  $: locationUnavailable = status !== "granted";

  const dispatch = createEventDispatcher();

  function locateUser() {
    setTimeout(() => {
      dispatch("locateUser");
    }, 0);
  }

  async function checkLocationPermissionStatus() {
    status = (await getLocationPermissionStatus()) as LocationPermissionStatus;
    if (status === "granted") {
      open = false;
      try {
        await getCurrentLocation();
        locateUser();
      } catch (e) {
        status = "denied";
        open = true;
      }
    }
    if (status === "denied") {
      open = true;
    }
    if (status === "prompt") {
      open = true;
    }
  }

  async function requestLocation() {
    try {
      await getCurrentLocation();
      setTimeout(locateUser, 0);
    } finally {
      await checkLocationPermissionStatus();
    }
  }
</script>

<Modal bind:open size="xs" permanent>
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
    <div class="flex flex-col gap-1">
      <h3
        class="text-center text-lg font-normal text-gray-500 dark:text-gray-400"
      >
        Grant access to your location to get started
      </h3>
      <P size="sm" class="text-center">
        Your location data will not be uploaded or shared with anyone. It is
        kept locally on your device.
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
        <Button on:click={requestLocation}>Continue</Button>
      </div>
    {/if}
  </div>
</Modal>
