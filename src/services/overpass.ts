import { get, writable } from "svelte/store";
import type { Geolocation } from "./geolocation";

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

export const racks = writable<Rack[]>([]);

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
  const result = elements.map((element) => {
    return {
      ...element,
      lng: element.lon,
    };
  });

  racks.set(result);
};
