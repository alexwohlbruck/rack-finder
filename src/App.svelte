<script>
  import { Map } from "mapbox-gl";
  import "../node_modules/mapbox-gl/dist/mapbox-gl.css";
  import { onMount, onDestroy } from "svelte";

  let map;
  let mapContainer;
  let lng, lat, zoom;

  lng = -80.8400869;
  lat = 35.2252207;
  zoom = 14;

  onMount(() => {
    const initialState = { lng: lng, lat: lat, zoom: zoom };

    map = new Map({
      container: mapContainer,
      accessToken:
        "pk.eyJ1IjoiYWxleHdvaGxicnVjayIsImEiOiJjbGtxNXhibTYwbGJ0M2RuenUybTg3bDZlIn0.lfZIscTvkJKY9P1cxR1nhQ",
      style: `mapbox://styles/alexwohlbruck/clkq6i5uv01gd01qm8rxq2pfl`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });
  });

  onDestroy(() => {
    map.remove();
  });
</script>

<main>
  <div class="map-wrap">
    <div class="map" bind:this={mapContainer} />
  </div>
</main>

<style>
  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
