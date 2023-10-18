<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "../map.config";
  import { GeolocateControl } from "mapbox-gl";
  import { prefsStore } from "../../../store/prefs";
  import { updateLocation } from "../../../store/location";

  const { getMap } = getContext(key) as any;
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
    // TODO:
    // fetchRacks(true, position);
  }

  const geolocateControl = new GeolocateControl(config);

  geolocateControl.on("geolocate", onGeolocateSuccess);

  map.addControl(geolocateControl);

  $: onboardingCompleted = $prefsStore.onboardingCompleted;

  function geolocate() {
    if (
      $prefsStore.prefs.locateOnOpen &&
      map &&
      mapLoaded &&
      onboardingCompleted &&
      !geolocateControl._watchState.includes("ACTIVE")
    ) {
      geolocateControl.trigger();
    }
  }
  $: {
    geolocate(), $prefsStore.prefs.locateOnOpen;
  }
  window.onfocus = () => {
    geolocate();
  };

  map.on("load", () => {
    mapLoaded = true;
    geolocate();
  });
</script>
