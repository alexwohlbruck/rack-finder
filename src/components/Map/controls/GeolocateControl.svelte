<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "../map.config";
  import { GeolocateControl } from "mapbox-gl";
  import { prefsStore } from "../../../store/prefs";
  import { updateLocation } from "../../../store/location";

  const { getMap, fetchRacks } = getContext(key) as any;
  const map = getMap();

  let mapLoaded = false;

  const config = {
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading: true,
    fitBoundsOptions: {
      maxZoom: 16,
    },
  };

  function onGeolocateSuccess(e) {
    const { latitude: lat, longitude: lng } = e.coords;
    const position = { lat, lng };
    updateLocation(position);
    fetchRacks(true, position);
  }

  const geolocateControl = new GeolocateControl(config);

  geolocateControl.on("geolocate", onGeolocateSuccess);

  map.addControl(geolocateControl);

  $: onboardingCompleted = $prefsStore.onboardingCompleted;
  $: {
    if (map && mapLoaded && onboardingCompleted) {
      geolocateControl.trigger();
    }
  }

  map.on("load", () => {
    mapLoaded = true;
  });
</script>
