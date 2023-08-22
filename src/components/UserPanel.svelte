<script>
  import { Avatar, Button, Card, P } from "flowbite-svelte";
  import { authStore } from "../store/auth";
  import { authenticate, logout } from "../services/osm";

  $: me = $authStore.me;
</script>

<Card padding="md" class="flex flex-1 max-w-none flex-row items-center gap-2">
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
    <Button outline on:click={logout} class="w-10 p-2  h-10">
      <svg
        class="w-4 h-4 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
        />
      </svg>
    </Button>
  {:else}
    <Button outline on:click={authenticate}>Sign in</Button>
  {/if}
</Card>
