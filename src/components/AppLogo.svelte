<script lang="ts">
  import { Avatar } from "flowbite-svelte";
  import logo from "../lib/icons/rack-finder.svg";

  export let size: "md" | "lg" = "md";
  $: sizeNum = size === "md" ? 12 : 20;
</script>

<Avatar
  {...$$props}
  class={`w-${sizeNum} h-${sizeNum} p-2 bg-primary-300 dark:bg-primary-300 border-2 border-primary-400 shadow-md shadow-primary-600/40 ${$$props.class}`}
  rounded
>
  <img src={logo} alt="Rack Finder Logo" />
</Avatar>
