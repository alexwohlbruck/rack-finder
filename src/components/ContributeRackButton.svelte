<script>
  import Button from "../lib/Button.svelte";
  import { authenticate, checkAuthenticated } from "../services/osm";
  import { toggleContributeMode, mapStore } from "../store/map";

  function contribute() {
    if (checkAuthenticated()) {
      toggleContributeMode();
    } else {
      authenticate();
    }
  }
</script>

<Button
  class="!p-5 bg-primary-400 absolute right-5 bottom-5 z-40"
  rounded
  shadow
  size="xl"
  on:click={contribute}
>
  <svg
    class="icon w-4 h-4 text-gray-800"
    class:rotate45={$mapStore.contributeMode}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2.5"
      d="M9 1v16M1 9h16"
    />
  </svg>
</Button>

<style>
  .icon {
    transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
    transform: rotate(0deg);
  }
  .rotate45 {
    transform: rotate(45deg);
  }
</style>
