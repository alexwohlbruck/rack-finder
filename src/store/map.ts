import { writable } from "svelte/store";
import { INITIAL_STATE } from "../components/Map/map.config";
import type { Position } from "../types/geolocation";

// TODO: this is redundant - prefs store also has last map center. Remove later?
const mapStore = writable({
  contributeMode: false,
  center: {
    lat: INITIAL_STATE.lat,
    lng: INITIAL_STATE.lng,
  },
});

export function toggleContributeMode(value?: boolean) {
  mapStore.update((store) => {
    return {
      ...store,
      contributeMode: value ?? !store.contributeMode,
    };
  });
}

export function setMapCenter({ lat, lng }: Position) {
  mapStore.update((store) => {
    return {
      ...store,
      center: {
        lat,
        lng,
      },
    };
  });
}

export { mapStore };
