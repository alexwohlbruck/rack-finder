<script lang="ts">
  import { Button, Heading, Label, Modal, Select } from "flowbite-svelte";
  import { authStore } from "../store/auth";
  import { prefsStore, setPrefs } from "../store/prefs";
  import Profile from "./Profile.svelte";
  import { logout } from "../services/osm";
  import { i18n } from "../i18n";
  import { t } from "../i18n";
  import type { LanguageOption } from "../store/prefs";

  export let open;

  $: me = $authStore.me;
  $: prefs = $prefsStore.prefs;

  $: {
    setPrefs(prefs);
  }
  $: {
    let language = prefs.language;
    if (prefs.language === "auto") {
      language = (navigator.language as LanguageOption) || "en-US";
    }
    $i18n.changeLanguage(language);
  }

  const unitsOptions = [
    { name: "Automatic", value: "auto" },
    { name: "Metric units", value: "metric" },
    { name: "Imperial units", value: "imperial" },
  ];
  const languageOptions = [
    { name: "Automatic", value: "auto" },
    { name: "English", value: "en-US" },
    { name: "Español", value: "es-ES" },
    { name: "Français", value: "fr-FR" },
    // { name: "Italiano", value: "it-IT" },
    // { name: "Nederlands", value: "nl-NL" },
    // { name: "Português", value: "pt-PT" },
  ];
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
      <Button size="sm" outline class="mr-7" on:click={logout}
        >{$t("auth.signOut")}</Button
      >
    </div>
  {/if}

  <Heading tag="h6">{$t("preferencesModal.preferences")}</Heading>

  <div class="flex flex-col gap-3 !mt-2">
    <Label>
      {$t("preferencesModal.measurementSystem")}
      <Select class="mt-2" items={unitsOptions} bind:value={prefs.units} />
    </Label>

    <Label>
      {$t("preferencesModal.language")}
      <Select
        class="mt-2"
        items={languageOptions}
        bind:value={prefs.language}
      />
    </Label>

    <Label>
      {$t("preferencesModal.theme")}
      <Select
        class="mt-2"
        items={themeOptions}
        bind:value={prefs.theme}
        disabled
      />
    </Label>
  </div>
</Modal>
