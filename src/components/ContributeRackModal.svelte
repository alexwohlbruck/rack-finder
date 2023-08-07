<script lang="ts">
  import { Card } from "flowbite-svelte";
  import Button from "../lib/Button.svelte";
  import { authStore } from "../store/auth";
  import { authenticate } from "../services/osm";
</script>

<Card class="flex flex-col gap-2">
  <h3 class="text-lg">Contribute new rack</h3>
  <div class="flex gap-2">
    <p>{$authStore.me?.display_name}</p>
    {#if $authStore.me}
      <Button>Contribute</Button>
    {:else}
      <Button on:click={authenticate}>Authenticate</Button>
    {/if}
  </div>
</Card>
