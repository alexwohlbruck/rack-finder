<script lang="ts">
  import { Modal } from "flowbite-svelte";
  import Stepper from "./Stepper.svelte";
  import LocationPermissionStep from "./onboarding/LocationPermissionStep.svelte";
  import WelcomeStep from "./onboarding/WelcomeStep.svelte";
  import { prefsStore } from "../store/prefs";
  import ContributeInstructionStep from "./onboarding/ContributeInstructionStep.svelte";
  import MapInstructionStep from "./onboarding/MapInstructionStep.svelte";

  let open = false;
  $: open = !$prefsStore.onboardingCompleted;
</script>

<Modal bind:open size="xs" permanent>
  <Stepper
    steps={[
      WelcomeStep,
      MapInstructionStep,
      ContributeInstructionStep,
      LocationPermissionStep,
    ]}
  />
</Modal>
