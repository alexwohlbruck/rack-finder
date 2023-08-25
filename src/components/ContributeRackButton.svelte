<script>
  import { Icon } from "flowbite-svelte-icons";
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
  <Icon name="plus-solid" class="w-4 h-4 text-gray-800" />
</Button>

<style>
  .icon {
    transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
    transform: rotate(0deg);
  }
  .rotate {
    transform: rotate(135deg);
  }
</style>
