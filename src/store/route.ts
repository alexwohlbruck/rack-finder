import { writable } from "svelte/store";
import type { Position } from "../types/geolocation";

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
    properties: any[];
    geometry: {
      coordinates: [number, number][];
      type: string;
    };
  }[];
};

const routeStore = writable<{
  route: Route | null;
  start: Position | null;
  end: Position | null;
}>({
  route: null,
  start: null,
  end: null,
});

export function setRoute(newRoute: Route, start: Position, end: Position) {
  routeStore.update(($data) => {
    return {
      ...$data,
      route: newRoute,
      start,
      end,
    };
  });
}

export function clearRoute() {
  routeStore.update(($data) => {
    return {
      ...$data,
      route: {},
      start: null,
      end: null,
    };
  });
}

export { routeStore };
