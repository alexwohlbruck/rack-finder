<script>
  import Button from "../lib/Button.svelte";
  import { authenticate, checkAuthenticated } from "../services/osm";
  import { toggleContributeMode } from "../store/map";

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
  pill
  shadow
  size="xl"
  on:click={contribute}
>
  <svg
    class="w-4 h-4 text-gray-800 dark:text-white"
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
