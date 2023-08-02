<script>
  import { Button } from "flowbite-svelte";
</script>

<Button
  color="yellow"
  class="bg-primary-300 hover:bg-primary-400 focus:ring-4 focus:ring-yellow-100 text-black"
  dark
  on:click
  {...$$props}
>
  <slot />
</Button>
