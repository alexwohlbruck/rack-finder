<script>
  import { Avatar, Button, Card, P } from "flowbite-svelte";
  import logo from "../lib/icons/rack-finder.svg";
  import AppInfoModal from "./AppInfoModal.svelte";

  let appInfoModalOpen = false;
</script>

<AppInfoModal bind:open={appInfoModalOpen} />

<Card class="flex flex-row items-center gap-2 !p-3">
  <button on:click={() => (appInfoModalOpen = true)}>
    <Avatar
      class="bg-primary-300 border-2 border-primary-400 shadow-md shadow-primary-600/40 !w-14 !h-14 p-3"
      rounded
    >
      <img src={logo} alt="Rack Finder Logo" />
    </Avatar>
  </button>
</Card>
