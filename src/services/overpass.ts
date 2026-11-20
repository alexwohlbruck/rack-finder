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

// Servers that fail are skipped for a cooldown that grows with each
// consecutive failure: 5m, 10m, 30m, 1h, then doubling, capped at 30 days.
// Stored in localStorage so a dead server stays skipped across reloads.
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const COOLDOWN_STEPS = [5 * MINUTE, 10 * MINUTE, 30 * MINUTE, HOUR];
const MAX_COOLDOWN = 30 * 24 * HOUR;
const HEALTH_KEY = "overpassServerHealth";

type ServerHealth = { [url: string]: { failures: number; until: number } };

export const cooldownFor = (failures: number) => {
  if (failures <= COOLDOWN_STEPS.length) return COOLDOWN_STEPS[failures - 1];
  const doublings = failures - COOLDOWN_STEPS.length;
  return Math.min(HOUR * 2 ** doublings, MAX_COOLDOWN);
};

const loadHealth = (): ServerHealth => {
  try {
    return JSON.parse(localStorage.getItem(HEALTH_KEY) || "{}");
  } catch {
    return {};
  }
};

const saveHealth = (health: ServerHealth) => {
  try {
    localStorage.setItem(HEALTH_KEY, JSON.stringify(health));
  } catch {
    // storage full or unavailable: cooldowns just won't persist
  }
};

const markFailure = (server: string) => {
  const health = loadHealth();
  const failures = (health[server]?.failures ?? 0) + 1;
  health[server] = { failures, until: Date.now() + cooldownFor(failures) };
  saveHealth(health);
};

const markSuccess = (server: string) => {
  const health = loadHealth();
  if (health[server]) {
    delete health[server];
    saveHealth(health);
  }
};

// Healthy servers in round-robin order. If every server is cooling down,
// try the one whose cooldown ends soonest so the app never gives up entirely.
const serversToTry = () => {
  const first = nextServer;
  nextServer = (nextServer + 1) % overpassUrls.length;
  const ordered = overpassUrls.map(
    (_, i) => overpassUrls[(first + i) % overpassUrls.length]
  );

  const health = loadHealth();
  const now = Date.now();
  const healthy = ordered.filter((url) => (health[url]?.until ?? 0) <= now);
  if (healthy.length) return healthy;

  const soonest = [...ordered].sort(
    (a, b) => health[a].until - health[b].until
  )[0];
  return [soonest];
};

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
  let lastError = "network error";
  for (const server of serversToTry()) {
    const response = await fetchWithTimeout(
      `${server}?data=${encodeURIComponent(query)}`
    );
    if (response?.ok) {
      markSuccess(server);
      return response.json();
    }

    lastError = `${response?.status ?? "network error"} from ${server}`;
    const retryable = !response || RETRYABLE_STATUSES.includes(response.status);
    if (!retryable) break; // e.g. 400 from a bad query: no server will accept it
    markFailure(server);

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
