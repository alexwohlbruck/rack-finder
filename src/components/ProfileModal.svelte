<script>
  import { A, Avatar, Heading, Label, Modal, P, Select } from "flowbite-svelte";
  import { authStore } from "../store/auth";
  import Profile from "./Profile.svelte";
  export let open;

  $: me = $authStore.me;

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

  const preferences = {
    units: "auto",
    language: "en-US",
    theme: "auto",
  };
</script>

<Modal bind:open autoclose outsideclose>
  <!-- <Heading tag="h5">My account</Heading> -->
  {#if me}
    <Profile {me} size="lg" />
  {/if}

  <Heading tag="h6">Preferences</Heading>

  <div class="flex flex-col gap-3 !mt-2">
    <Label>
      Measurement system
      <Select
        class="mt-2"
        items={unitsOptions}
        bind:value={preferences.units}
        disabled
      />
    </Label>
    <Label>
      Language
      <Select
        class="mt-2"
        items={languageOptions}
        bind:value={preferences.language}
        disabled
      />
    </Label>
    <Label>
      Theme
      <Select
        class="mt-2"
        items={themeOptions}
        bind:value={preferences.theme}
        disabled
      />
    </Label>
  </div>
</Modal>
