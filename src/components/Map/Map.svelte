<script lang="ts">
  import { Map } from "mapbox-gl";
  import { onMount, onDestroy } from "svelte";
  import * as barrelman from "../../services/barrelman";
  import { mapStore, storeMapPosition } from "../../store/map";
  import "../../../node_modules/mapbox-gl/dist/mapbox-gl.css";
  import {
    DEBOUNCE_TIME,
    DEFAULT_FETCH_RADIUS,
    RACKS_FETCH_OUTER_BOUNDS_RATIO,
    RACKS_LAYER_MAX_ZOOM,
    mapConfig,
  } from "./map.config";
  import AddRackButton from "../AddRackButton.svelte";
  import { haversine } from "../../util";
  import type { Position } from "../../types/geolocation";
  import SatelliteToggle from "./controls/SatelliteToggle.svelte";
  import { showToast } from "../../store/toast";
  import { t } from "../../i18n";

  // Store a list of areas which bike racks have already been fetched
  const areasLoaded: {
    lat: number;
    lng: number;
    radius: number;
  }[] = [];

  let timeout;
  const onMoveEnd = () => {
    clearTimeout(timeout);
    storeMapPosition(map.getCenter(), map.getZoom());
    timeout = setTimeout(() => {
      fetchRacks();
    }, DEBOUNCE_TIME);
  };

  export async function fetchRacks(ignoreZoom = false, center?: Position) {
    if (!map) return;
    const tooFarZoom = !ignoreZoom && map.getZoom() < RACKS_LAYER_MAX_ZOOM;
    center = center || map.getCenter();
    if (tooFarZoom || isAreaLoaded(center)) return;
    const radius = ignoreZoom
      ? DEFAULT_FETCH_RADIUS
      : RACKS_FETCH_OUTER_BOUNDS_RATIO(getViewportRadius());
    const radiusWithBuffer = ignoreZoom
      ? radius
      : RACKS_FETCH_OUTER_BOUNDS_RATIO(radius);
    // Mark the area before fetching so map moves don't send duplicate queries
    // while a request is in flight; forget it on failure so it can be retried
    const area = { lat: center.lat, lng: center.lng, radius };
    areasLoaded.push(area);
    try {
      await barrelman.fetchRacks(
        center,
        ignoreZoom ? DEFAULT_FETCH_RADIUS : radiusWithBuffer
      );
    } catch (error) {
      areasLoaded.splice(areasLoaded.indexOf(area), 1);
      console.error(error);
      showToast($t("toast.racksLoadFailed"), "error");
    }
  }

  // Check if the map bounds are within any of the previously loaded areas
  function isAreaLoaded(center: Position) {
    const radius = getViewportRadius();
    return areasLoaded.some((area) => {
      const dist = haversine(center, area);
      return dist < area.radius + radius;
    });
  }

  // Return the radius of the viewport in meters
  // Effectively the width or height of the map view, whichever is larger
  function getViewportRadius() {
    const bounds = map.getBounds();
    const center = map.getCenter();
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    const neDist = haversine(center, ne);
    const swDist = haversine(center, sw);
    return Math.max(neDist, swDist);
  }

  let mapContainer;
  export let map;

  onMount(() => {
    initMap();
  });
  onDestroy(() => {
    map?.remove();
  });

  function initMap() {
    map = new Map({
      ...mapConfig,
      container: mapContainer,
    });
    map.on("moveend", onMoveEnd);
  }
</script>

<div class="relative w-full h-full">
  <AddRackButton />
  <SatelliteToggle />
  <div class="map" bind:this={mapContainer}>
    {#if map}
      <slot />
    {/if}
  </div>
</div>

<style>
  .map {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>
