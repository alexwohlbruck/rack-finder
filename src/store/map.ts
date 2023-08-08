import { writable } from "svelte/store";
import { INITIAL_STATE } from "../components/Map/map.config";

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

export function setMapCenter({ lat, lng }) {
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
