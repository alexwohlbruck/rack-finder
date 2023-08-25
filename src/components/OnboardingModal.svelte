<script lang="ts">
  import { Modal } from "flowbite-svelte";
  import Stepper from "./Stepper.svelte";
  import LocationPermissionStep from "./onboarding/LocationPermissionStep.svelte";
  import WelcomeStep from "./onboarding/WelcomeStep.svelte";
  import { prefsStore } from "../store/prefs";
  import InformationStep from "./onboarding/InformationStep.svelte";

  let open = false;
  $: open = !$prefsStore.onboardingCompleted;
</script>

<Modal bind:open size="xs" permanent>
  <Stepper steps={[WelcomeStep, InformationStep, LocationPermissionStep]} />
</Modal>
