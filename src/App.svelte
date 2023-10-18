<script lang="ts">
  import { Card } from "flowbite-svelte";
  import Map from "./components/Map/Map.svelte";
  import OnboardingModal from "./components/OnboardingModal.svelte";
  import InstallModal from "./components/InstallModal.svelte";
  import ProfilePanel from "./components/ProfilePanel.svelte";
  import Toast from "./lib/Toast.svelte";
  import AppLogoPanel from "./components/AppLogoPanel.svelte";
  import Router from "svelte-spa-router";
  import { routes } from "./router";
  import dark from "./store/theme";
  import GeolocateControl from "./components/Map/controls/GeolocateControl.svelte";
  import NavigationControl from "./components/Map/controls/NavigationControl.svelte";
  import AttributionControl from "./components/Map/controls/AttributionControl.svelte";
  import RacksSource from "./components/Map/sources/RacksSource.svelte";
  import Buildings3DLayer from "./components/Map/layers/Buildings3DLayer.svelte";
  import ClusterLayer from "./components/Map/layers/ClusterLayer.svelte";
  import RacksLayer from "./components/Map/layers/RacksLayer.svelte";
  import RouteLayer from "./components/Map/layers/RouteLayer.svelte";
  import RouteSource from "./components/Map/sources/RouteSource.svelte";
  import MapIcons from "./components/Map/assets/MapIcons.svelte";
  import ThemeController from "./components/Map/controllers/ThemeController.svelte";
  import { setContext } from "svelte";
  import { key } from "./components/Map/map.config";
  import PlacementMarker from "./components/Map/markers/PlacementMarker.svelte";
  import { showToast } from "./store/toast";

  let map, fetchRacks;
  let installModal = false;

  setContext(key, {
    getMap: () => map,
    fetchRacks,
  });
</script>

<div class:dark={$dark}>
  <OnboardingModal />
  <InstallModal bind:open={installModal} />
  <Toast />

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
        <Map bind:map bind:fetchRacks>
          <ThemeController />
          <MapIcons />

          <RacksSource />
          <RouteSource />

          <Buildings3DLayer />
          <RouteLayer />
          <RacksLayer />
          <ClusterLayer />

          <PlacementMarker />

          <NavigationControl />
          <GeolocateControl />
          <AttributionControl />
        </Map>
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
