<script>
  import Button from "../lib/Button.svelte";
  import { authenticate, checkAuthenticated } from "../services/osm";
  import { push } from "svelte-spa-router";
  import { mapStore } from "../store/map";
  import PlusSolid from "flowbite-svelte-icons/PlusSolid.svelte";

  $: contributeMode = $mapStore.contributeMode;

  function contribute() {
    if (checkAuthenticated()) {
      push(contributeMode ? "/" : "/racks/add");
    } else {
      authenticate();
    }
  }
</script>

<div class="absolute bottom-0 right-0 z-10 p-[.6rem]">
  <Button
    class="!p-5 bg-primary-400"
    rounded
    shadow
    size="xl"
    on:click={contribute}
  >
    <span class="icon" class:rotate={contributeMode}>
      <PlusSolid class="w-4 h-4 text-gray-800 outline-none" />
    </span>
  </Button>
</div>

<style>
  .icon {
    transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
    transform: rotate(0deg);
  }
  .rotate {
    transform: rotate(135deg);
  }
</style>
