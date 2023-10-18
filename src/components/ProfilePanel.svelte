<script>
  import { Button, ButtonGroup, Card } from "flowbite-svelte";
  import { authStore } from "../store/auth";
  import { authenticate, logout } from "../services/osm";
  import PreferencesModal from "./PreferencesModal.svelte";
  import Profile from "./Profile.svelte";
  import { t } from "../i18n/index";

  $: me = $authStore.me;
  let profilePanelOpen = false;
</script>

<PreferencesModal bind:open={profilePanelOpen} />

<Card class="flex flex-1 max-w-none flex-row items-center gap-2 !p-3">
  <div class="flex flex-row items-center gap-2 flex-1">
    <Profile {me} />
  </div>

  <ButtonGroup>
    {#if me}
      <Button
        size="xs"
        color="primary"
        outline
        on:click={logout}
        class="w-10 p-2  h-10"
      >
        <svg
          class="w-4 h-4"
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
      <Button size="xs" color="primary" outline on:click={authenticate}>
        {$t("auth.signIn")}
      </Button>
    {/if}
    <Button
      size="xs"
      color="primary"
      outline
      on:click={() => (profilePanelOpen = true)}
    >
      <svg
        class="w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"
        />
      </svg>
    </Button>
  </ButtonGroup>
</Card>
