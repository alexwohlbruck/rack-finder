<script lang="ts">
  import { Marker } from "mapbox-gl";
  import { getContext } from "svelte";
  import { key, palette } from "../map.config";
  import { location } from "svelte-spa-router";
  import { mapStore } from "../../../store/map";
  import { prefsStore } from "../../../store/prefs";

  const { getMap } = getContext(key) as any;
  const map = getMap();

  let marker, mapLoaded, styleLoaded;

  $: contributeMode = $mapStore.contributeMode;

  const onMove = () => {
    if (contributeMode) {
      const center = map.getCenter();
      marker?.setLngLat({
        lat: center.lat,
        lng: center.lng,
      });
    }
  };

  const onMoveEnd = () => {
    const center = map.getCenter();
    marker?.setLngLat({
      lat: center.lat,
      lng: center.lng,
    });
  };

  const markerDragEnd = () => {
    const center = marker.getLngLat();
    map.flyTo({
      center: [center.lng, center.lat],
      duration: 200,
    });
  };

  $: {
    if (mapLoaded && styleLoaded) {
      if (contributeMode) {
        const center = map.getCenter();
        marker = new Marker({
          draggable: true,
          color: palette.primary[500],
        })
          .setLngLat({
            lat: center.lat,
            lng: center.lng,
          })
          .addTo(map);
        marker.on("dragend", markerDragEnd);
      } else {
        marker?.remove();
      }
    }
  }

  map.on("move", onMove);
  map.on("moveend", onMoveEnd);
  map.on("load", () => {
    mapLoaded = true;
  });
  map.on("style.load", () => {
    styleLoaded = true;
  });
</script>
