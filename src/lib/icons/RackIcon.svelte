<script>
  import { asComponent as icons } from "./icons";
  export let name;
  export let size = 1;

  let icon;
  $: {
    icon = icons[name] || icons.stands;
  }
</script>

<svelte:component this={icon} />
