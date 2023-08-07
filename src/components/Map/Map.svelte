<script lang="ts">
  import { Map, Marker, Popup, GeolocateControl } from "mapbox-gl";
  import { onMount, onDestroy } from "svelte";
  import * as op from "../../services/overpass";
  import { racksStore } from "../../store/racks";
  import { locationStore, updateLocation } from "../../store/location";
  import { mapStore, syncMapCenter } from "../../store/map";
  import "../../../node_modules/mapbox-gl/dist/mapbox-gl.css";
  import {
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

  let mapContainer;
  let map;
  let geolocateControl;
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

    // Use debounce to only load 2s after the last moveend event
    let timeout;
    map.on("moveend", () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fetchRacks();
      }, 2000);
    });

    map.on("move", () => {
      const center = map.getCenter();
      marker?.setLngLat({
        lat: center.lat,
        lng: center.lng,
      });
      syncMapCenter(center);
    });
  }

  // Watch racks data update and update map
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

  $: contributeMode = $mapStore.contributeMode;

  const markerDragStart = () => {
    const { lng, lat } = marker.getLngLat();
    map.panTo([lng, lat]);
    map.dragPan.enable();
  };
  const markerDragEnd = () => {
    map.dragPan.disable();
  };
  const mapClick = (e) => {
    marker.setLngLat(e.lngLat).addTo(map);
  };
  $: {
    if (map) {
      // const style = map.contributeMode ? styles.satellite : styles.light;
      // map.setStyle(style); // TODO: This doesn't work and clears layers

      if (contributeMode) {
        // Place a marker on the map center, pin the map center to the marker location, allow user to drag the marker'
        marker = new Marker({
          draggable: true,
          color: palette[500],
        })
          .setLngLat([map.getCenter().lng, map.getCenter().lat])
          .addTo(map);

        marker.on("dragend", markerDragEnd);
        marker.on("dragstart", markerDragStart);
        map.on("click", mapClick);
      } else {
        map.off("click", mapClick);
        marker?.remove();
      }
    }
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
