<script lang="ts">
  import { Toast } from "flowbite-svelte";
  import { toastStore } from "../store/toast";
  import { Icon } from "flowbite-svelte-icons";
</script>

{#each $toastStore as toast, i}
  <Toast
    color={toast.type === "success" ? "green" : "red"}
    class="max-w-md absolute z-50 bottom-5 left-1/2 transform -translate-x-1/2"
  >
    <svelte:fragment slot="icon">
      <Icon
        name={toast.type === "success" ? "check-solid" : "close-solid"}
        class="w-4 h-4"
      />
    </svelte:fragment>
    {toast.message}
  </Toast>
{/each}
