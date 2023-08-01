import { get, writable } from "svelte/store";
import type { Geolocation } from "./geolocation";
import store from "../store";
import { RacksReducer } from "../store/racks";

const baseUrl = "https://overpass-api.de/api/interpreter";

export type Rack = {
  id: number;
  lat: number;
  lng: number;
  tags: {
    amenity?: string;
    bicycle_parking?: string;
    capacity?: string;
    covered?: string;
    fee?: string;
    lit?: string;
    operator?: string;
    source?: string;
  };
};

export const op = async (query: string) => {
  const response = await fetch(`${baseUrl}?data=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data;
};

export const fetchRacks = async ({ lat, lng }: Geolocation, radius: number) => {
  const query = `
    [out:json];
    node["amenity"="bicycle_parking"](around:${radius}, ${lat}, ${lng});
    out;
  `;
  const { elements } = await op(query);
  elements.forEach((element) => {
    const payload = {
      ...element,
      lng: element.lon,
    };
    store.dispatch({ type: RacksReducer.ADD_RACK, payload });
  });
};
