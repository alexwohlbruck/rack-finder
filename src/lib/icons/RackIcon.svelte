<script>
  import { asComponent as icons } from "./icons";
  export let name;
  export let size = 4;
  export let capacity;

  let icon;
  $: {
    icon = icons[name] || icons.stands;
    if (capacity && capacity > 2 && name === "stands") {
      icon = icons.stands_multi;
    }
  }
</script>

<div class="rack-icon text-primary-600">
  <svelte:component this={icon} {...$$props} class={`w-${size} h-${size}`} />
</div>

<style>
  :global(.rack-icon svg) {
    fill: currentColor;
  }
</style>
