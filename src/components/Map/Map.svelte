<script lang="ts">
  import {
    Map,
    Marker,
    Popup,
    GeolocateControl,
    NavigationControl,
  } from "mapbox-gl";
  import { onMount, onDestroy } from "svelte";
  import * as op from "../../services/overpass";
  import { racksStore } from "../../store/racks";
  import { locationStore, updateLocation } from "../../store/location";
  import { mapStore, setMapCenter } from "../../store/map";
  import "../../../node_modules/mapbox-gl/dist/mapbox-gl.css";
  import {
    DEBOUNCE_TIME,
    RACKS_FETCH_OUTER_BOUNDS_RATIO,
    RACKS_LAYER_MAX_ZOOM,
    clustersCountLayer,
    clustersLayer,
    geolocateControlConfig,
    mapConfig,
    palette,
    racksLayer,
    racksSourceName,
    styles,
    unclusteredPointLayer,
  } from "./map.config";
  import type { Rack } from "../../types/Rack";
  import ContributeRackButton from "../ContributeRackButton.svelte";
  import { haversine } from "../../util";
  import type { Position } from "../../types/geolocation";

  let mapContainer;
  let map;
  let geolocateControl;
  let navigationControl;
  let marker;

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
      style: getSystemTheme(),
    });

    watchSystemTheme();

    geolocateControl = new GeolocateControl(geolocateControlConfig);
    geolocateControl.on("geolocate", onGeolocateSuccess);

    navigationControl = new NavigationControl();

    map.addControl(geolocateControl);
    map.addControl(navigationControl);

    map.on("load", () => {
      addMapLayers();
    });

    map.on("style.load", async () => {
      addMapLayers();
      updateRacksLayer($racksStore.racks);
    });

    // Use debounce to only load 2s after the last moveend event
    let timeout;
    map.on("moveend", () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const center = map.getCenter();
        marker?.setLngLat({
          lat: center.lat,
          lng: center.lng,
        });
        if (
          center.lat !== $locationStore.lat ||
          center.lng !== $locationStore.lng
        ) {
          setMapCenter(center);
        }
        fetchRacks();
      }, DEBOUNCE_TIME);
    });

    map.on("move", () => {
      if (contributeMode) {
        const center = map.getCenter();
        marker?.setLngLat({
          lat: center.lat,
          lng: center.lng,
        });
      }
    });
  }

  function addMapLayers() {
    map.addSource(racksSourceName, racksLayer);
    map.addLayer(clustersLayer);
    map.addLayer(clustersCountLayer);
    map.addLayer(unclusteredPointLayer);
  }

  function updateRacksLayer(racks) {
    map?.getSource("racks")?.setData({
      type: "FeatureCollection",
      features: Object.values(racks).map((rack: Rack) => ({
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

  function setMapStyle(style = getSystemTheme()) {
    map.setStyle(style);
  }

  $: {
    const racks = $racksStore.racks;
    updateRacksLayer(racks);
  }

  $: {
    const center = $mapStore.center;
    const currentCenter = map?.getCenter();
    if (
      center &&
      (center.lng != currentCenter?.lng || center.lat != currentCenter?.lat)
    ) {
      map?.setCenter([center.lng, center.lat]);
    }
  }

  // Watch contribute mode and update listeners
  $: contributeMode = $mapStore.contributeMode;
  $: {
    if (map) {
      setMapStyle(contributeMode ? styles.satellite : getSystemTheme());

      if (contributeMode) {
        marker = new Marker({
          draggable: true,
          color: palette[500],
        })
          .setLngLat([map.getCenter().lng, map.getCenter().lat])
          .addTo(map);
      } else {
        marker?.remove();
      }
    }
  }

  // Store a list of areas which bike racks have already been fetched
  const areasLoaded: {
    lat: number;
    lng: number;
    radius: number;
  }[] = [];

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

  // Check if the map bounds are within any of the previously loaded areas
  function isAreaLoaded(center: Position) {
    const radius = getViewportRadius();
    return areasLoaded.some((area) => {
      const dist = haversine(center, area);
      return dist < area.radius + radius;
    });
  }

  function fetchRacks(center?: Position) {
    if (!map) return;
    const tooFarZoom = map.getZoom() < RACKS_LAYER_MAX_ZOOM;
    center = center || map.getCenter();
    if (tooFarZoom || isAreaLoaded(center)) return;
    console.log("Loading new area");
    const radius = RACKS_FETCH_OUTER_BOUNDS_RATIO(getViewportRadius());
    areasLoaded.push({ lat: center.lat, lng: center.lng, radius });
    op.fetchRacks(center, radius);
  }

  function getSystemTheme() {
    return !(
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      ? styles.light
      : styles.dark;
  }

  function watchSystemTheme() {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addListener((e) => {
      if (contributeMode) return;
      if (e.matches) {
        setMapStyle(styles.dark);
      } else {
        setMapStyle(styles.light);
      }
    });
  }
</script>

<div class="relative w-full h-full">
  <ContributeRackButton />
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
