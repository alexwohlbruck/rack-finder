<script>
  import { Card } from "flowbite-svelte";
  import AppInfoModal from "./AppInfoModal.svelte";
  import AppLogo from "./AppLogo.svelte";

  let appInfoModalOpen = false;
</script>

<AppInfoModal bind:open={appInfoModalOpen} />

<Card class="flex flex-row items-center gap-2 !p-2">
  <button on:click={() => (appInfoModalOpen = true)}>
    <AppLogo />
  </button>
</Card>
