<script>
  import { Map, Marker } from "mapbox-gl";
  import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
  import { onMount, onDestroy } from "svelte";
  import colors, { inherit } from "tailwindcss/colors";
  import * as op from "../services/overpass";

  let map;
  let mapContainer;
  let lng, lat, zoom;

  lat = 35.2252207;
  lng = -80.8400869;
  zoom = 14;

  onMount(() => {
    init();
  });

  async function init() {
    // Fetch user's locaiton using the browser's geolocation API

    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    lat = pos.coords.latitude;
    lng = pos.coords.longitude;

    console.log(`${lat},${lng}`);

    const initialState = { lng: lng, lat: lat, zoom: zoom };

    map = new Map({
      container: mapContainer,
      accessToken:
        "pk.eyJ1IjoiYWxleHdvaGxicnVjayIsImEiOiJjbGtxNXhibTYwbGJ0M2RuenUybTg3bDZlIn0.lfZIscTvkJKY9P1cxR1nhQ",
      style: `mapbox://styles/alexwohlbruck/clkq6i5uv01gd01qm8rxq2pfl`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });

    // Query for bike racks within a radius of a given point
    op.fetchBikeRacks(lat, lng, 5000).then(({ elements }) => {
      for (const element of elements) {
        const marker = new Marker({ color: colors.pink["500"] })
          .setLngLat([element.lon, element.lat])
          .addTo(map);
      }
    });
  }

  onDestroy(() => {
    map.remove();
  });
</script>

<div class="map-wrap">
  <div class="map" bind:this={mapContainer} />
</div>

<style>
  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
