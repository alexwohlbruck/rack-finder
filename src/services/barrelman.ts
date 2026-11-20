import { addRacks } from "../store/racks";
import type { Geolocation } from "../types/geolocation";
import type { Rack } from "../types/rack";
import devData from "./south-end-data.json";
import config from "../config";
import * as overpass from "./overpass";

const { useDevData, barrelmanUrl, barrelmanApiKey } = config;

// Barrelman caps each search page at 200 rows
const PAGE_SIZE = 200;
// Stop paging after this many results so one map move can't burn credits
const MAX_RESULTS = 1000;

const RETRYABLE_STATUSES = [429, 502, 503, 504];
const MAX_ATTEMPTS = 3;
const INITIAL_BACKOFF_MS = 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const request = async (path: string, init: RequestInit = {}) => {
  let backoff = INITIAL_BACKOFF_MS;

  for (let attempt = 1; ; attempt++) {
    const response = await fetch(`${barrelmanUrl}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${barrelmanApiKey}`,
        "Content-Type": "application/json",
        ...init.headers,
      },
    }).catch(() => null);

    if (response?.ok) {
      return response.json();
    }

    const retryable = !response || RETRYABLE_STATUSES.includes(response.status);
    if (!retryable || attempt >= MAX_ATTEMPTS) {
      throw new Error(
        `Barrelman request failed: ${response?.status ?? "network error"}`
      );
    }

    // Honor Retry-After (seconds) when the server sends one
    const retryAfter = Number(response?.headers.get("Retry-After"));
    const wait =
      retryAfter > 0 ? retryAfter * 1000 : backoff + Math.random() * backoff;
    await sleep(wait);
    backoff *= 2;
  }
};

const OSM_TYPES = { N: "node", W: "way", R: "relation" } as const;

type BarrelmanPlace = {
  osm_type: keyof typeof OSM_TYPES;
  osm_id: string;
  tags: Rack["tags"];
  geometry: { type: "Point"; coordinates: [number, number] };
};

// Barrelman returns a centroid point for ways and relations too
const toRack = (place: BarrelmanPlace): Rack => {
  const [lng, lat] = place.geometry.coordinates;
  return {
    id: Number(place.osm_id),
    type: OSM_TYPES[place.osm_type],
    lat,
    lng,
    tags: place.tags,
  };
};

// Dev fixture is an Overpass response
const fromDevData = (): Rack[] =>
  devData.elements.map((element: any) => {
    const { lat, lon } =
      element.type === "way" ? element.center : element;
    return { ...element, lat, lng: lon };
  });

export const fetchRacks = async (
  { lat, lng }: Geolocation,
  radius: number
) => {
  if (useDevData) {
    const racks = fromDevData();
    addRacks(racks);
    return racks;
  }

  const racks: Rack[] = [];
  for (let offset = 0; offset < MAX_RESULTS; offset += PAGE_SIZE) {
    const page: BarrelmanPlace[] = await request("/search", {
      method: "POST",
      body: JSON.stringify({
        lat,
        lng,
        radius: Math.round(radius),
        tags: { amenity: "bicycle_parking" },
        limit: PAGE_SIZE,
        offset,
      }),
    });
    racks.push(...page.map(toRack));
    if (page.length < PAGE_SIZE) break;
  }

  // Barrelman's import doesn't cover every region yet (e.g. Europe), so fall
  // back to Overpass where it has nothing
  if (racks.length === 0) {
    return overpass.fetchRacks({ lat, lng }, radius);
  }

  addRacks(racks);
  return racks;
};
