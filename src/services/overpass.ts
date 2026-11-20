import { addRacks } from "../store/racks";
import type { Geolocation } from "../types/geolocation";
import devData from "./south-end-data.json";
import config from "../config";

const { useDevData, overpassUrl: baseUrl } = config;

// Overpass asks clients to retry these with exponential backoff
const RETRYABLE_STATUSES = [429, 502, 503, 504];
const MAX_ATTEMPTS = 4;
const INITIAL_BACKOFF_MS = 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const op = async (query: string) => {
  const url = `${baseUrl}?data=${encodeURIComponent(query)}`;
  let backoff = INITIAL_BACKOFF_MS;

  for (let attempt = 1; ; attempt++) {
    const response = await fetch(url).catch(() => null);
    if (response?.ok) {
      return response.json();
    }

    const retryable = !response || RETRYABLE_STATUSES.includes(response.status);
    if (!retryable || attempt >= MAX_ATTEMPTS) {
      throw new Error(
        `Overpass request failed: ${response?.status ?? "network error"}`
      );
    }

    // Jitter so clients that failed together don't retry together
    await sleep(backoff + Math.random() * backoff);
    backoff *= 2;
  }
};

export const fetchRacks = async ({ lat, lng }: Geolocation, radius: number) => {
  // get meta and center
  const query = `
    [out:json];
    (
      node["amenity"="bicycle_parking"](around:${radius}, ${lat}, ${lng});
      way["amenity"="bicycle_parking"](around:${radius}, ${lat}, ${lng});
    );
    out center meta;
  `;
  const { elements } = useDevData ? devData : await op(query);

  const payload = elements.map((element) => {
    let { lat, lon: lng } = element;
    if (element.type === "way") {
      const { center } = element;
      lat = center.lat;
      lng = center.lon;
    }
    return {
      ...element,
      lat,
      lng,
    };
  });

  addRacks(payload);
  return payload;
};

export const fetchRack = async (id: number) => {
  const query = `
    [out:json];
    (
      node(${id});
      way(${id});
    );
    out center meta;
  `;

  const { elements } = useDevData ? devData : await op(query);
  const element = elements[0];
  let { lat, lon: lng } = element;

  if (element.type === "way") {
    const { center } = element;
    lat = center.lat;
    lng = center.lon;
  }

  const payload = {
    ...element,
    lat,
    lng,
  };

  addRacks([payload]);
  return payload;
};
