<script lang="ts">
  import { Map, Marker, Popup, GeolocateControl } from "mapbox-gl";
  import { onMount, onDestroy } from "svelte";
  import * as op from "../../services/overpass";
  import { racksStore } from "../../store/racks";
  import { locationStore, updateLocation } from "../../store/location";
  import {
    clustersCountLayer,
    clustersLayer,
    geolocateControlConfig,
    mapConfig,
    racksLayer,
    racksSourceName,
    unclusteredPointLayer,
  } from "./map.config";

  let mapContainer;
  let map;
  let geolocateControl;

  onMount(() => {
    initMap();
  });
  onDestroy(() => {
    map?.remove();
  });

  export function locateUser() {
    geolocateControl.trigger();
    if ($locationStore) {
      fetchRacks($locationStore);
    }
  }

  function onGeolocateSuccess(e) {
    updateLocation(e);
  }

  function initMap() {
    map = new Map({
      ...mapConfig,
      container: mapContainer,
    });

    geolocateControl = new GeolocateControl(geolocateControlConfig);
    geolocateControl.on("geolocate", onGeolocateSuccess);

    map.addControl(geolocateControl);

    map.on("load", async () => {
      map.addSource(racksSourceName, racksLayer);
      map.addLayer(clustersLayer);
      map.addLayer(clustersCountLayer);
      map.addLayer(unclusteredPointLayer);
    });

    map.on("moveend", () => {
      fetchRacks();
    });
  }

  $: {
    const { racks: all } = $racksStore;

    map?.getSource("racks")?.setData({
      type: "FeatureCollection",
      features: Object.values(all).map((rack) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [rack.lng, rack.lat],
        },
        properties: {
          id: rack.id,
          cluster: true,
        },
      })),
    });
  }

  function fetchRacks(center?) {
    center = center || map.getCenter();
    op.fetchRacks(center, 5000);
  }
</script>

<div class="relative w-full h-full">
  <div class="map" bind:this={mapContainer} />
</div>

<style>
  .map {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>
