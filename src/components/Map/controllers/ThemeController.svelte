<script lang="ts">
  import { getContext } from "svelte";
  import { key, styles } from "../map.config";
  import SunCalc from "suncalc";
  import { locationStore } from "../../../store/location";
  import dark from "../../../store/theme";
  import { location } from "svelte-spa-router";
  import { mapStore } from "../../../store/map";

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
    } = SunCalc.getTimes(now, $locationStore.lat, $locationStore.lng);

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
    if (!contributeMode) {
      map.setConfigProperty("basemap", "lightPreset", lightPreset);
    }
  }

  $: {
    // Watch dark theme change
    setLightPreset(getLightPreset($dark));
  }

  map.on("load", () => {
    mapLoaded = true;
    setLightPreset(getLightPreset($dark));
  });

  map.on("style.load", () => {
    if (!contributeMode) {
      map.setConfigProperty("basemap", "showPointOfInterestLabels", false);
    }
  });

  $: {
    setMapStyle(contributeMode ? styles.satellite : styles.standard);
  }
</script>
