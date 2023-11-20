<script lang="ts">
  import {
    Button,
    Card,
    Heading,
    Label,
    Modal,
    P,
    Select,
    Range,
    Toggle,
  } from "flowbite-svelte";
  import { authStore } from "../store/auth";
  import { prefsStore, setPrefs } from "../store/prefs";
  import Profile from "./Profile.svelte";
  import { logout } from "../services/osm";
  import { t, i18n } from "../i18n/index";
  import type { LanguageOption } from "../store/prefs";
  import { clearLocalStorageAndRefresh } from "../localStorage";

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
    { name: $t("preferencesModal.auto"), value: "auto" },
    {
      name: $t("preferencesModal.measurementSystemOptions.metric"),
      value: "metric",
    },
    {
      name: $t("preferencesModal.measurementSystemOptions.imperial"),
      value: "imperial",
    },
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
    { name: $t("preferencesModal.auto"), value: "auto" },
    { name: $t("preferencesModal.themeOptions.light"), value: "light" },
    { name: $t("preferencesModal.themeOptions.dark"), value: "dark" },
  ];

  let confirmClearCache = false;
  function clearCache() {
    if (confirmClearCache) {
      clearLocalStorageAndRefresh();
    } else {
      confirmClearCache = true;
    }
  }
</script>

<Modal bind:open outsideclose>
  {#if me}
    <Heading tag="h5">{$t("preferencesModal.profile")}</Heading>
    <div class="flex items-center">
      <div class="flex-1">
        <Profile {me} size="lg" />
      </div>
      <Button size="sm" outline on:click={logout}>{$t("auth.signOut")}</Button>
    </div>
  {/if}

  <Heading tag="h5">{$t("preferencesModal.preferences")}</Heading>

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
      <Select class="mt-2" items={themeOptions} bind:value={prefs.theme} />
    </Label>
  </div>

  <Heading tag="h6">{$t("preferencesModal.advanced")}</Heading>

  <div class="flex flex-col gap-3 !mt-2">
    <Label>{$t("preferencesModal.mapAnimationSpeed")}</Label>
    <div class="flex gap-3 items-center">
      <P class="w-9">{prefs.animationSpeedMs / 1000} s</P>
      <Range
        bind:value={prefs.animationSpeedMs}
        id="range1"
        min="0"
        max="2000"
        step="100"
      />
    </div>

    <div class="mt-3 flex flex-col gap-6">
      <Toggle bind:checked={prefs.locateOnOpen}>
        {$t("preferencesModal.locateOnOpen")}
      </Toggle>

      <Toggle bind:checked={prefs.autoSatellite}>
        {$t("preferencesModal.autoSatellite")}
      </Toggle>

      <Toggle bind:checked={prefs.buildings3d}>
        {$t("preferencesModal.buildings3d")}
      </Toggle>

      <Toggle bind:checked={prefs.showPOIs}>
        {$t("preferencesModal.showPOIs")}
      </Toggle>
    </div>
  </div>

  <Card class="!p-4 max-w-none !bg-red-500/10 !border-red-500/40">
    <Heading tag="h6">{$t("preferencesModal.dangerZone")}</Heading>

    <div class="flex flex-col gap-3 !mt-2">
      <div class="flex">
        <div class="flex flex-col flex-1">
          <Label>{$t("preferencesModal.clearCache")}</Label>
          <P size="xs">
            {$t("preferencesModal.clearCacheDescription")}
          </P>
        </div>
        <Button
          color="red"
          on:click={clearCache}
          class={confirmClearCache
            ? ""
            : `scale-100 active:scale-110 transition-transform`}
        >
          {$t(confirmClearCache ? "common.confirm" : "common.clear")}
        </Button>
      </div>
    </div>
  </Card>
</Modal>
