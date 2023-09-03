import { writable } from "svelte/store";
import { INITIAL_STATE } from "../components/Map/map.config";
import type { Position } from "../types/geolocation";
import { syncedWritable } from "../util";

const mapStore = syncedWritable("map", {
  zoom: 1,
  center: {
    lat: INITIAL_STATE.lat,
    lng: INITIAL_STATE.lng,
  },
});

export function setMapCenter({ lat, lng }: Position, zoom?: number) {
  mapStore.update((store) => {
    return {
      ...store,
      zoom: zoom ?? store.zoom,
      center: {
        lat,
        lng,
      },
    };
  });
}

export { mapStore };
