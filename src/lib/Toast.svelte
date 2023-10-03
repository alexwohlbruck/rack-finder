<script lang="ts">
  import { Toast } from "flowbite-svelte";
  import { toastStore } from "../store/toast";
  import { CheckSolid, CloseSolid } from "flowbite-svelte-icons";
</script>

{#each $toastStore as toast, i}
  <Toast
    color={toast.type === "success" ? "green" : "red"}
    class="max-w-md absolute z-50 bottom-5 left-1/2 transform -translate-x-1/2"
  >
    <svelte:fragment slot="icon">
      {#if toast.type === "success"}
        <CheckSolid class="w-4 h-4" />
      {:else}
        <CloseSolid class="w-4 h-4" />
      {/if}
    </svelte:fragment>
    {toast.message}
  </Toast>
{/each}
