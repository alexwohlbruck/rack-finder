<script>
  import { Icon } from "flowbite-svelte-icons";
  import Button from "../lib/Button.svelte";
  import { authenticate, checkAuthenticated } from "../services/osm";
  import { push } from "svelte-spa-router";
  import { mapStore } from "../store/map";

  $: contributeMode = $mapStore.contributeMode;

  function contribute() {
    if (checkAuthenticated()) {
      push(contributeMode ? "/" : "/racks/add");
    } else {
      authenticate();
    }
  }
</script>

<Button
  class="!p-5 bg-primary-400 absolute right-0 bottom-0 m-[.6rem] z-10"
  rounded
  shadow
  size="xl"
  on:click={contribute}
>
  <span class="icon" class:rotate={contributeMode}>
    <Icon name="plus-solid" class="w-4 h-4 text-gray-800 outline-none" />
  </span>
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
