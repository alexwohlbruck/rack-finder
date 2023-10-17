import { writable } from "svelte/store";
import type { Position } from "./types/geolocation";
import type { Units } from "./store/prefs";

// TODO: Refactor these methods into more appropriate files

export const haversine = (a: Position, b: Position) => {
  if (!(a?.lat && a?.lng && b?.lat && b?.lng)) {
    return 0;
  }
  const R = 6371e3; // Earth radius in meters
  const φ1 = (a.lat * Math.PI) / 180; // φ, λ in radians
  const φ2 = (b.lat * Math.PI) / 180;
  const Δφ = ((b.lat - a.lat) * Math.PI) / 180;
  const Δλ = ((b.lng - a.lng) * Math.PI) / 180;

  const a1 =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a1), Math.sqrt(1 - a1));

  const d = R * c; // in metres
  return d;
};

export const metersToFeet = (meters: number) => {
  return meters * 3.28084;
};

export const renderDistance = (
  distanceInMeters: number,
  preferredUnits: Units = "metric"
) => {
  const isMetric = preferredUnits === "metric";
  const shortUnit = isMetric ? "m" : "ft";
  const longUnit = isMetric ? "km" : "mi";
  const longUnitValue = isMetric ? 1000 : 5280;

  if (distanceInMeters === 0) return `0 ${shortUnit}`;
  if (!distanceInMeters) return "";

  const shortDistance = isMetric
    ? distanceInMeters
    : metersToFeet(distanceInMeters);

  const longDistance = shortDistance / longUnitValue;
  if (longDistance < 0.1) {
    return `${Math.round(shortDistance)} ${shortUnit}`;
  }
  return `${longDistance.toFixed(1)} ${longUnit}`;
};

export const capitalize = (str: string): string => {
  if (!str || !str.length) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const snakeToWords = (str: string): string => {
  if (!str || !str.length) return "";
  const spaces = str.split("_").join(" ");
  return spaces.charAt(0).toUpperCase() + spaces.slice(1);
};

export const friendlyName = (str: string) => {
  if (!str || !str.length) return "";
  return capitalize(snakeToWords(str));
};

export const syncedWritable = <T>(name: string, initialData: T) => {
  const storedValue = JSON.parse(localStorage.getItem(name) || "{}");
  const store = writable<T>({
    ...initialData,
    ...storedValue,
  });
  store.subscribe((value) => {
    localStorage.setItem(name, JSON.stringify(value));
  });
  return store;
};

export const osmProfileUrl = (user: string) => {
  return `https://www.openstreetmap.org/user/${user}`;
};

export const osmElementUrl = (type: string, id: string) => {
  return `https://www.openstreetmap.org/${type}/${id}`;
};
