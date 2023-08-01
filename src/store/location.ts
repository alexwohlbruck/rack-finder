import type { Geolocation } from "../types/Geolocation";
import { writable } from "svelte/store";

const locationStore = writable({
  lat: 35.2271,
  lng: -80.8431,
  accuracy: 0,
  heading: null,
  speed: null,
});

export function updateLocation(newLocation: Geolocation) {
  locationStore.update(($data) => {
    $data = { ...$data, ...newLocation };
    return $data;
  });
}

export { locationStore };
