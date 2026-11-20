import { addRacks } from "../store/racks";
import type { Geolocation } from "../types/geolocation";
import devData from "./south-end-data.json";
import config from "../config";

const { useDevData, overpassUrls } = config;

// Public Overpass instances are frequently overloaded or throttling, so spread
// requests across several and fail over to the next one when a server errors
// or hangs
const REQUEST_TIMEOUT_MS = 30000;
const RETRYABLE_STATUSES = [429, 502, 503, 504];

let nextServer = Math.floor(Math.random() * overpassUrls.length);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithTimeout = async (url: string) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal });
  } catch {
    return null; // network error or timeout
  } finally {
    clearTimeout(timer);
  }
};

export const op = async (query: string) => {
  // Round robin: each query starts on the next server in the list
  const first = nextServer;
  nextServer = (nextServer + 1) % overpassUrls.length;

  let lastError = "network error";
  for (let i = 0; i < overpassUrls.length; i++) {
    const server = overpassUrls[(first + i) % overpassUrls.length];
    const response = await fetchWithTimeout(
      `${server}?data=${encodeURIComponent(query)}`
    );
    if (response?.ok) {
      return response.json();
    }

    lastError = `${response?.status ?? "network error"} from ${server}`;
    const retryable = !response || RETRYABLE_STATUSES.includes(response.status);
    if (!retryable) break; // e.g. 400 from a bad query: no server will accept it

    // Brief jittered pause so failing clients don't stampede the next server
    await sleep(250 + Math.random() * 500);
  }

  throw new Error(`Overpass request failed: ${lastError}`);
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
