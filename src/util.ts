import type { Position } from "./types/geolocation";

export const haversine = (a: Position, b: Position) => {
  const R = 6371e3; // metres
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

export const renderDistance = (distanceInMeters) => {
  if (distanceInMeters === 0) return "0 m";
  if (!distanceInMeters) return "";

  const distanceInKm = distanceInMeters / 1000;

  if (distanceInKm < 1) {
    return `${Math.round(distanceInMeters)} m`;
  }
  return `${distanceInKm.toFixed(1)} km`;
};

export const capitalize = (str) => {
  if (!str || !str.length) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const camelcaseToWords = (str) => {
  const spaces = str.split("_").join(" ");
  return spaces.charAt(0).toUpperCase() + spaces.slice(1);
};
