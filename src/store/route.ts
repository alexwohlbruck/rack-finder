import { writable } from "svelte/store";

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
}>({
  route: null,
});

export function setRoute(newRoute: Route) {
  routeStore.update(($data) => {
    return {
      ...$data,
      route: newRoute,
    };
  });
}

export function clearRoute() {
  routeStore.update(($data) => {
    return {
      ...$data,
      route: {},
    };
  });
}

export { routeStore };
