<script lang="ts">
  import { Toast } from "flowbite-svelte";
  import { toastStore } from "../store/toast";
</script>

{#each $toastStore as toast, i}
  <Toast
    color="green"
    class="max-w-md absolute z-50 bottom-5 left-1/2 transform -translate-x-1/2"
  >
    <svelte:fragment slot="icon">
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="sr-only">Check icon</span>
    </svelte:fragment>
    {toast.message}
  </Toast>
{/each}
