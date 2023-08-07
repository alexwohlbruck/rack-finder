<script>
  import { Avatar, Button, Card, P } from "flowbite-svelte";
  import { authStore } from "../store/auth";
  import { authenticate, logout } from "../services/osm";

  $: me = $authStore.me;
</script>

<Card padding="md" class="flex flex-row items-center gap-2">
  <div class="flex flex-row items-center gap-2 flex-1">
    <Avatar
      src={me?.img.href}
      alt={me?.display_name}
      rounded
      size="sm"
      border
      class="shadow-md"
    />
    <div class="flex flex-col">
      <P size="sm" weight="medium">{me?.display_name || "Not signed in"}</P>
      {#if me}
        <P size="xs">
          {me?.changesets.count}
          OSM contribution{me?.changesets.count !== 1 ? "s" : ""}
        </P>
      {/if}
    </div>
  </div>

  {#if me}
    <Button outline on:click={logout}>Sign out</Button>
  {:else}
    <Button outline on:click={authenticate}>Sign in</Button>
  {/if}
</Card>
