<script lang="ts">
  import { Card } from "flowbite-svelte";
  import Map from "./components/Map/Map.svelte";
  import OnboardingModal from "./components/OnboardingModal.svelte";
  import ProfilePanel from "./components/ProfilePanel.svelte";
  import Toast from "./lib/Toast.svelte";
  import AppLogoPanel from "./components/AppLogoPanel.svelte";
  import Router from "svelte-spa-router";
  import { routes } from "./router";
  import dark from "./store/theme";
</script>

<OnboardingModal />
<Toast />

<div class:dark={$dark}>
  <main class="h-[100dvh] bg-gray-50 dark:bg-gray-900">
    <div
      class="h-full flex flex-col-reverse md:flex-row md- gap-2 items-stretch"
    >
      <div
        class="side-panel flex flex-col gap-2 h-3/5 md:h-auto md:w-2/5 lg:w-1/3 md:max-w-[30rem]"
      >
        <Router {routes} restoreScrollState={true} />

        <div class="flex gap-2">
          <AppLogoPanel />
          <ProfilePanel />
        </div>
      </div>

      <Card padding="none" class="flex-auto max-w-none overflow-hidden">
        <Map />
      </Card>
    </div>
  </main>
</div>

<style>
  @supports (padding: max(0px)) {
    main {
      padding-top: max(0.5rem, env(safe-area-inset-top));
      padding-left: max(0.5rem, env(safe-area-inset-left));
      padding-right: max(0.5rem, env(safe-area-inset-right));
      padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
    }
  }

  .side-panel > :global(div) {
    max-width: none;
  }

  :global([role="dialog"]) {
    outline: none !important;
  }
</style>
