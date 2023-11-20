<script lang="ts">
  import { getContext } from "svelte";
  import { key, styles } from "../map.config";
  import SunCalc from "suncalc";
  import dark from "../../../store/theme";
  import { mapStore, toggleSatellite } from "../../../store/map";
  import { prefsStore } from "../../../store/prefs";

  const { getMap } = getContext(key) as any;
  const map = getMap();

  $: contributeMode = $mapStore.contributeMode;
  let mapLoaded = false;

  function setMapStyle(style = styles.standard) {
    // TODO: Used to be !map || !mapLoaded, check this works ok
    if (!map) return;
    map.setStyle(style);
  }

  // TODO: Change map style when the clock passes one of these thresholds
  function getLightPreset(darkMode = false) {
    const now = new Date();
    const {
      nauticalDawn, // Dawn begins
      goldenHourEnd, // End of sunrise
      goldenHour, // Sun begins setting
      night, // Dusk ends
    } = SunCalc.getTimes(now, $mapStore.center?.lat, $mapStore.center?.lng);

    const isGolden =
      (now > nauticalDawn && now < goldenHourEnd) ||
      (now > goldenHour && now < night);

    let lightPreset;

    if (darkMode) {
      lightPreset = isGolden ? "dusk" : "night";
    } else {
      lightPreset = isGolden ? "dawn" : "day";
    }
    return lightPreset;
  }

  function setLightPreset(lightPreset = "day") {
    if (!map || !mapLoaded) return;
    if (mapHasBasemap()) {
      map.setConfigProperty("basemap", "lightPreset", lightPreset);
    }
  }

  function setDarkTheme(dark?: boolean) {
    setLightPreset(getLightPreset(dark ?? $dark));
  }

  function showPOILabels(show: boolean) {
    if (mapHasBasemap()) {
      map.setConfigProperty("basemap", "showPointOfInterestLabels", show);
    }
  }

  function mapHasBasemap() {
    try {
      return map.style.fragments?.some((f: any) => f.id === "basemap");
    } catch (err) {
      return false;
    }
  }

  $: {
    // Watch dark theme change
    setDarkTheme($dark);
  }

  map.on("load", () => {
    mapLoaded = true;
    setDarkTheme();
  });

  map.on("style.load", () => {
    setDarkTheme();
    showPOILabels($prefsStore.prefs.showPOIs);
  });

  $: {
    if (mapLoaded && $prefsStore.prefs.autoSatellite) {
      toggleSatellite(contributeMode);
    }
  }
  $: {
    if (mapLoaded) {
      showPOILabels($prefsStore.prefs.showPOIs);
    }
  }

  // Handle change to satellite
  let satellite = $mapStore.satellite;
  $: {
    if (satellite !== $mapStore.satellite) {
      satellite = $mapStore.satellite;
      setMapStyle(satellite ? styles.satellite : styles.standard);
      setDarkTheme();
    }
  }
</script>
