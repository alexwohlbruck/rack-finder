<script>
  import { Map, Marker, Popup } from "mapbox-gl";
  import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
  import { onMount, onDestroy } from "svelte";
  import colors, { inherit } from "tailwindcss/colors";
  import * as op from "../services/overpass";
  import { Button } from "flowbite-svelte";

  let map;
  let mapContainer;
  let zoom = 14;

  onMount(() => {
    init();
  });

  async function init() {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const initialState = { lng: lng, lat: lat, zoom: zoom };

    map = new Map({
      container: mapContainer,
      accessToken:
        "pk.eyJ1IjoiYWxleHdvaGxicnVjayIsImEiOiJjbGtxNXhibTYwbGJ0M2RuenUybTg3bDZlIn0.lfZIscTvkJKY9P1cxR1nhQ",
      style: `mapbox://styles/mapbox/streets-v12`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });

    queryRacks(lat, lng);
  }

  const markers = [];

  function clearMarkers() {
    for (const marker of markers) {
      marker.remove();
    }
  }

  function queryRacks(lat, lng) {
    // Query for bike racks within a radius of a given point
    op.fetchBikeRacks(lat, lng, 10000).then(({ elements }) => {
      for (const element of elements) {
        console.log({ element });
        const { bicycle_parking: type, capacity } = element.tags;
        const description = `${type} rack, ${capacity} bike capacity`;
        const capitalized =
          description.charAt(0).toUpperCase() + description.slice(1);
        const popup = new Popup({ offset: 25 }).setText(capitalized);
        const marker = new Marker({ color: colors.pink["500"] })
          .setLngLat([element.lon, element.lat])
          .setPopup(popup)
          .addTo(map);
        markers.push(marker);
      }
    });
  }

  async function refresh() {
    clearMarkers();
    const center = map.getCenter();
    queryRacks(center.lat, center.lng);
  }

  onDestroy(() => {
    map.remove();
  });
</script>

<div class="map-wrap">
  <div class="map" bind:this={mapContainer} />
  <div class="refresh">
    <Button pill on:click={refresh}>Refresh</Button>
  </div>
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
