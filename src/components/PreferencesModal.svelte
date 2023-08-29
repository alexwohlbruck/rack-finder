<script>
  import { Button, Heading, Label, Modal, Select } from "flowbite-svelte";
  import { authStore } from "../store/auth";
  import { prefsStore, setPrefs } from "../store/prefs";
  import Profile from "./Profile.svelte";
  import { logout } from "../services/osm";
  export let open;

  $: me = $authStore.me;
  $: prefs = $prefsStore.prefs;

  $: {
    setPrefs(prefs);
  }

  const unitsOptions = [
    { name: "Automatic", value: "auto" },
    { name: "Metric units", value: "metric" },
    { name: "Imperial units", value: "imperial" },
  ];
  const languageOptions = [{ name: "English", value: "en-US" }];
  const themeOptions = [
    { name: "Automatic", value: "auto" },
    { name: "Light", value: "light" },
    { name: "Dark", value: "dark" },
  ];
</script>

<Modal bind:open outsideclose>
  {#if me}
    <div class="flex items-center">
      <div class="flex-1">
        <Profile {me} size="lg" />
      </div>
      <Button size="sm" outline class="mr-7" on:click={logout}>Sign out</Button>
    </div>
  {/if}

  <Heading tag="h6">Preferences</Heading>

  <div class="flex flex-col gap-3 !mt-2">
    <Label>
      Measurement system
      <Select class="mt-2" items={unitsOptions} bind:value={prefs.units} />
    </Label>
    <Label>
      Language
      <Select
        class="mt-2"
        items={languageOptions}
        bind:value={prefs.language}
        disabled
      />
    </Label>
    <Label>
      Theme
      <Select
        class="mt-2"
        items={themeOptions}
        bind:value={prefs.theme}
        disabled
      />
    </Label>
  </div>
</Modal>
