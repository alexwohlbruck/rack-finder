<script lang="ts">
  // import { Map, Marker, Popup, GeolocateControl } from "mapbox-gl";
  import { Map, Marker, Popup, GeolocateControl } from "svelte-mapbox-gl";
  import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
  import { onMount, onDestroy } from "svelte";
  import * as op from "../services/overpass";
  import { racksStore } from "../store/racks";
  import colors from "tailwindcss/colors";
  import { locationStore, updateLocation } from "../store/location";
  import PopupContent from "./PopupContent.svelte";

  // TODO: Import palette from tailwind config
  // import tailwindConfig from "../../tailwind.config.cjs";
  // const palette = tailwindConfig.theme.extend.colors;
  const accessToken =
    "pk.eyJ1IjoiYWxleHdvaGxicnVjayIsImEiOiJjbGtxNXhibTYwbGJ0M2RuenUybTg3bDZlIn0.lfZIscTvkJKY9P1cxR1nhQ";
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
    // map = new Map({
    //   container: mapContainer,
    //   accessToken,
    //   style: `mapbox://styles/mapbox/streets-v12`,
    //   center: [INITIAL_STATE.lng, INITIAL_STATE.lat],
    //   zoom: INITIAL_STATE.zoom,
    //   fadeDuration: 500,
    // });
    // geolocateControl = new GeolocateControl({
    //   positionOptions: {
    //     enableHighAccuracy: true,
    //   },
    //   trackUserLocation: true,
    //   showUserHeading: true,
    //   fitBoundsOptions: {
    //     maxZoom: 15,
    //   },
    // });
    // geolocateControl.on("geolocate", onGeolocateSuccess);
    // map.addControl(geolocateControl);
    // map.on("load", async () => {
    //   const palette = colors.yellow;
    //   const racksSourceName = "racks";
    //   const racksLayer = {
    //     type: "geojson",
    //     data: {
    //       type: "FeatureCollection",
    //       features: [
    //         {
    //           type: "Feature",
    //           geometry: {
    //             type: "Point",
    //             coordinates: [-80.843124, 35.227085],
    //           },
    //           properties: {
    //             id: "1",
    //             cluster: true,
    //           },
    //         },
    //       ],
    //     },
    //     cluster: true,
    //     clusterMaxZoom: 14,
    //     clusterRadius: 25,
    //   };
    //   const clustersLayer = {
    //     id: "clusters",
    //     type: "circle",
    //     source: "racks",
    //     filter: ["has", "point_count"],
    //     paint: {
    //       "circle-color": [
    //         "step",
    //         ["get", "point_count"],
    //         palette[200],
    //         5,
    //         palette[300],
    //         10,
    //         palette[400],
    //         20,
    //         palette[500],
    //         50,
    //         palette[600],
    //       ],
    //       "circle-stroke-width": 1.5,
    //       "circle-stroke-color": palette[500],
    //       "circle-radius": [
    //         "step",
    //         ["get", "point_count"],
    //         10,
    //         5,
    //         15,
    //         20,
    //         20,
    //         50,
    //         25,
    //         100,
    //         30,
    //         500,
    //         33,
    //         1000,
    //         37,
    //         3000,
    //         40,
    //       ],
    //     },
    //   };
    //   const clustersCountLayer = {
    //     id: "cluster-count",
    //     type: "symbol",
    //     source: "racks",
    //     filter: ["has", "point_count"],
    //     layout: {
    //       "text-field": "{point_count_abbreviated}",
    //       "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    //       "text-size": 12,
    //     },
    //   };
    //   const unclusteredPointLayer = {
    //     id: "unclustered-point",
    //     type: "circle",
    //     source: racksSourceName,
    //     filter: ["!", ["has", "point_count"]],
    //     paint: {
    //       "circle-color": colors.yellow[600],
    //       "circle-radius": 3.5,
    //       "circle-stroke-width": 2,
    //       "circle-stroke-color": colors.yellow[800],
    //     },
    //   };
    //   const heatmapLayer = {
    //     id: "racks-heat",
    //     type: "heatmap",
    //     source: racksSourceName,
    //     maxzoom: 9,
    //     paint: {
    //       // Increase the heatmap weight based on frequency and property magnitude
    //       "heatmap-weight": [
    //         "interpolate",
    //         ["linear"],
    //         ["get", "mag"],
    //         0,
    //         0,
    //         6,
    //         1,
    //       ],
    //       // Increase the heatmap color weight weight by zoom level
    //       // heatmap-intensity is a multiplier on top of heatmap-weight
    //       "heatmap-intensity": [
    //         "interpolate",
    //         ["linear"],
    //         ["zoom"],
    //         0,
    //         1,
    //         9,
    //         3,
    //       ],
    //       // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    //       // Begin color ramp at 0-stop with a 0-transparency color
    //       // to create a blur-like effect.
    //       "heatmap-color": [
    //         "interpolate",
    //         ["linear"],
    //         ["heatmap-density"],
    //         0,
    //         "rgba(33,102,172,0)",
    //         0.2,
    //         "rgb(103,169,207)",
    //         0.4,
    //         "rgb(209,229,240)",
    //         0.6,
    //         "rgb(253,219,199)",
    //         0.8,
    //         "rgb(239,138,98)",
    //         1,
    //         "rgb(178,24,43)",
    //       ],
    //       // Adjust the heatmap radius by zoom level
    //       "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
    //       // Transition from heatmap to circle layer by zoom level
    //       "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
    //     },
    //   };
    //   map.addSource(racksSourceName, racksLayer);
    //   // map.addLayer(heatmapLayer);
    //   map.addLayer(clustersLayer);
    //   map.addLayer(clustersCountLayer);
    //   map.addLayer(unclusteredPointLayer);
    // });
    // map.on("moveend", () => {
    //   fetchRacks(map.getCenter());
    // });
    // map.on("click", "unclustered-point", (e) => {
    //   const { id } = e.features[0].properties;
    //   const rack = $racksStore.racks[id];
    //   if (!rack) return;
    //   const popup = new Popup({
    //     closeButton: false,
    //     closeOnClick: false,
    //   });
    //   // Use PopupContent component to render popup content
    //   popup.setDOMContent(new PopupContent({ text: "test" } as any));
    //   popup.setLngLat(e.features[0].geometry.coordinates).addTo(map);
    // });
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

  // Charlotte
  const coordinates = { lat: 35.227085, lng: -80.843124 };

  const geolocateControlOptions = {
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading: true,
    fitBoundsOptions: {
      maxZoom: 15,
    },
  };
</script>

<div class="relative w-full h-full">
  <!-- <div class="map" bind:this={mapContainer} /> -->

  <Map
    accessToken="pk.eyJ1IjoiYWxleHdvaGxicnVjayIsImEiOiJjbGtxNXhibTYwbGJ0M2RuenUybTg3bDZlIn0.lfZIscTvkJKY9P1cxR1nhQ"
    style="mapbox://styles/mapbox/streets-v12"
    center={coordinates}
    zoom={14}
  >
    <GeolocateControl trackUserLocation={true} showUserLocation={true} />
    <Popup {coordinates}>
      <PopupContent text="test" />
    </Popup>
  </Map>
</div>

<style>
  .map {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>
