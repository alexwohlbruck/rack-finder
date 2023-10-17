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
  import { t } from "../../i18n";
  import { MapPinSolid } from "flowbite-svelte-icons";

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
  <MapPinSolid class="w-12 h-12 text-sky-500" />
  <div class="flex flex-col gap-2">
    <Heading tag="h5" class="text-center">
      {$t("onboarding.locationPermissionStep.title")}
    </Heading>
    <P size="sm" class="text-center">
      {$t("onboarding.locationPermissionStep.description")}
    </P>
  </div>
  {#if status === "denied"}
    <Alert class="text-center">
      <span class="font-medium">
        {$t("onboarding.locationPermissionStep.permissionDenied")}
      </span>
    </Alert>
    <FlowbiteButton outline size="sm" on:click={skip}>
      {$t("onboarding.locationPermissionStep.skip")}
    </FlowbiteButton>
  {:else}
    <div class="flex gap-2">
      <Button size="sm" on:click={requestLocation}>
        {$t("onboarding.locationPermissionStep.grant")}
      </Button>
      <FlowbiteButton outline size="sm" on:click={skip}>
        {$t("onboarding.locationPermissionStep.skip")}
      </FlowbiteButton>
    </div>
  {/if}
</div>
