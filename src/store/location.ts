import type { Geolocation } from "../types/geolocation";
import { writable } from "svelte/store";

const locationStore = writable({
  lat: 0,
  lng: 0,
  accuracy: 0,
  heading: null,
  speed: null,
});

function updateLocation(newLocation: Geolocation) {
  locationStore.update(($data) => {
    $data = { ...$data, ...newLocation };
    return $data;
  });
}

export { locationStore, updateLocation };
