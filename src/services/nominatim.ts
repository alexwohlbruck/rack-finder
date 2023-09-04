import config from "../config";
import { Position } from "../types/geolocation";

const { nominatimUrl: baseUrl } = config;

export const reverseLookup = async (position: Position) => {
  const { lat, lng } = position;
  const qs = new URLSearchParams({
    lat: lat.toString(),
    lon: lng.toString(),
    format: "json",
  });
  const url = `${baseUrl}/reverse?${qs.toString()}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
