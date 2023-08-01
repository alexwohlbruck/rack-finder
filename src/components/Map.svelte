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

    // Add a geojson source with clustered markers
    map.on("load", () => {
      map.addSource("racks", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-80.843124, 35.227085],
              },
              properties: {
                id: "1",
                cluster: true,
              },
            },
          ],
        },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "racks",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": colors.blue[500],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "racks",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "racks",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": colors.blue[500],
          "circle-radius": 6,
          "circle-stroke-width": 1,
          "circle-stroke-color": colors.blue[800],
        },
      });
    });

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
