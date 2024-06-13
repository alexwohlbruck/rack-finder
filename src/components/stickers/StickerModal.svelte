<script lang="ts">
  import { Modal } from "flowbite-svelte";
  import Stepper from "../Stepper.svelte";
  import ThankYouModal from "./ThankYouStep.svelte";
  import StickerPicker from "./StickerPickerStep.svelte";

  export let open;
</script>

<Modal bind:open size="sm">
  <Stepper steps={[ThankYouModal, StickerPicker]}></Stepper>
</Modal>
