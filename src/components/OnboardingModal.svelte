<script lang="ts">
  import { Modal } from "flowbite-svelte";
  import Stepper from "./Stepper.svelte";
  import LocationPermissionStep from "./onboarding/LocationPermissionStep.svelte";
  import WelcomeStep from "./onboarding/WelcomeStep.svelte";
  import { prefsStore } from "../store/prefs";

  let open = false;
  $: open = !$prefsStore.onboardingCompleted;
</script>

<Modal bind:open size="xs" permanent>
  <Stepper steps={[WelcomeStep, LocationPermissionStep]} />
</Modal>
