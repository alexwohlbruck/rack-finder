import { writable } from "svelte/store";
import { INITIAL_STATE } from "../components/Map/map.config";
import type { Position } from "../types/geolocation";
import { syncedWritable } from "../util";
import { derived } from "svelte/store";
import { location } from "svelte-spa-router";

// TODO: Move to types file
type Route = {
  type: "FeatureCollection";
  metadata: {
    attribution: string;
    service: string;
    timestamp: number;
    query: {
      coordinates: [number, number][];
      profile: string;
      format: string;
    };
    engine: {
      version: string;
      build_date: string;
      graph_date: string;
    };
  };
  bbox: number[];
  features: {
    bbox: number[];
    type: string;
    properties: {
      fare: number;
      segments: {
        distance: number;
        duration: number;
        steps: {
          distance: number;
          instruction: string;
          name: string;
          type: number;
          way_points: number[];
        }[];
      }[];
      summary: {
        distance: number;
        duration: number;
      };
      transfers: 0;
      way_points: number[];
    };
    geometry: {
      coordinates: [number, number][];
      type: string;
    };
  }[];
};

type MapStore = {
  zoom: number;
  center: Position;
  satellite: boolean;
  route: {
    data: Route | null;
    start: Position | null;
    end: Position | null;
  };
};

const store = syncedWritable<MapStore>("map", {
  zoom: 1,
  center: {
    lat: INITIAL_STATE.lat,
    lng: INITIAL_STATE.lng,
  },
  satellite: false,
  route: {
    data: null,
    start: null,
    end: null,
  },
});

export const mapStore = derived([store, location], ([$mapStore, $location]) => {
  const addMode = $location === "/racks/add";
  const editMode = /^\/racks\/\d+\/edit$/.test($location);
  const contributeMode = addMode || editMode;

  return {
    ...$mapStore,
    addMode,
    editMode,
    contributeMode,
  };
});

export function storeMapPosition({ lat, lng }: Position, zoom?: number) {
  if (!lat || !lng) return;
  store.update((store) => {
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

export function toggleSatellite(satellite: boolean) {
  store.update((store) => {
    return {
      ...store,
      satellite,
    };
  });
}

export function setRoute(newRoute: Route, start: Position, end: Position) {
  store.update(($data) => {
    return {
      ...$data,
      route: {
        data: newRoute,
        start,
        end,
      },
    };
  });
}

export function clearRoute() {
  store.update(($data) => {
    return {
      ...$data,
      route: {
        data: null,
        start: null,
        end: null,
      },
    };
  });
}
