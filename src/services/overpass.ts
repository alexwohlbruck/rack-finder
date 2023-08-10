import { addRacks } from "../store/racks";
import type { Geolocation } from "../types/geolocation";

const baseUrl = "https://overpass-api.de/api/interpreter";

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
  const racks = elements.map((r) => ({
    ...r,
    lng: r.lon,
  }));
  addRacks(racks);
};
