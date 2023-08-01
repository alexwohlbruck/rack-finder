<script lang="ts">
  import { Map, Marker, Popup } from "mapbox-gl";
  import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
  import { onMount, onDestroy } from "svelte";
  import * as op from "../services/overpass";
  import { watchLocation, stopWatchingLocation } from "../services/geolocation";
  import { racksStore } from "../store/racks";
  import { locationStore } from "../store/location";
  import colors from "tailwindcss/colors";

  const INITIAL_STATE = {
    lng: -80.843124,
    lat: 35.227085,
    zoom: 14,
  };
  let map;
  let mapContainer;
  const markers = [];

  onMount(() => {
    initMap();
    watchLocation();
  });

  onDestroy(() => {
    stopWatchingLocation();
    map?.remove();
  });

  function initMap() {
    map = new Map({
      container: mapContainer,
      accessToken:
        "pk.eyJ1IjoiYWxleHdvaGxicnVjayIsImEiOiJjbGtxNXhibTYwbGJ0M2RuenUybTg3bDZlIn0.lfZIscTvkJKY9P1cxR1nhQ",
      style: `mapbox://styles/mapbox/streets-v12`,
      center: [INITIAL_STATE.lng, INITIAL_STATE.lat],
      zoom: INITIAL_STATE.zoom,
    });

    fetchRacks();
    map.on("moveend", () => {
      fetchRacks();
    });
  }

  $: {
    const { lng, lat } = $locationStore;
    map?.setCenter([lng, lat]);
  }

  $: {
    const { racks: all } = $racksStore;
    clearMarkers();
    for (const rack of Object.values(all)) {
      const { bicycle_parking: type, capacity } = rack.tags;
      const description = `${type} rack, ${capacity} bike capacity`;
      const capitalized =
        description.charAt(0).toUpperCase() + description.slice(1);
      const popup = new Popup({ offset: 25 }).setText(capitalized);
      const marker = new Marker({ color: colors.amber["500"] })
        .setLngLat([rack.lng, rack.lat])
        .setPopup(popup)
        .addTo(map);
      markers.push(marker);
    }
  }

  function fetchRacks() {
    op.fetchRacks(map.getCenter(), 5000);
  }

  function clearMarkers() {
    for (const marker of markers) {
      marker.remove();
    }
  }
</script>

<div class="relative w-full h-full">
  <div class="map" bind:this={mapContainer} />
</div>

<style>
  .refresh {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 5;
  }

  .map {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>
