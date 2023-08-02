<script lang="ts">
  import { Map, Marker, Popup, GeolocateControl } from "mapbox-gl";
  import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
  import { onMount, onDestroy } from "svelte";
  import * as op from "../services/overpass";
  import { racksStore } from "../store/racks";
  import colors from "tailwindcss/colors";
  import { locationStore, updateLocation } from "../store/location";

  // TODO: Import palette from tailwind config
  // import tailwindConfig from "../../tailwind.config.cjs";
  // const palette = tailwindConfig.theme.extend.colors;
  const palette = colors.yellow;
  const INITIAL_STATE = {
    lng: -30.6271504,
    lat: 29.108255,
    zoom: 2,
  };
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
      container: mapContainer,
      accessToken:
        "pk.eyJ1IjoiYWxleHdvaGxicnVjayIsImEiOiJjbGtxNXhibTYwbGJ0M2RuenUybTg3bDZlIn0.lfZIscTvkJKY9P1cxR1nhQ",
      style: `mapbox://styles/mapbox/streets-v12`,
      center: [INITIAL_STATE.lng, INITIAL_STATE.lat],
      zoom: INITIAL_STATE.zoom,
      fadeDuration: 500,
    });

    geolocateControl = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
      fitBoundsOptions: {
        maxZoom: 15,
      },
    });
    geolocateControl.on("geolocate", onGeolocateSuccess);

    map.addControl(geolocateControl);

    map.on("load", async () => {
      const racksSourceName = "racks";
      const racksLayer = {
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
        clusterRadius: 25,
      };
      const clustersLayer = {
        id: "clusters",
        type: "circle",
        source: "racks",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": palette[300],
          "circle-stroke-width": 1.5,
          "circle-stroke-color": palette[500],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            10,
            50,
            15,
            100,
            20,
            250,
            25,
            500,
            30,
            1000,
            33,
            5000,
            37,
            10000,
            40,
          ],
        },
      };
      const clustersCountLayer = {
        id: "cluster-count",
        type: "symbol",
        source: "racks",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      };
      const unclusteredPointLayer = {
        id: "unclustered-point",
        type: "circle",
        source: racksSourceName,
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": palette[600],
          "circle-radius": 3,
          "circle-stroke-width": 2,
          "circle-stroke-color": palette[800],
        },
      };

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
