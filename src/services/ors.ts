import config from "../config";
import type { Position } from "../types/geolocation";
import { showToast } from "../store/toast";
import { setRoute } from "../store/map";

const { openrouteserviceUrl: baseUrl, openrouteserviceApiKey: apiKey } = config;

type Mode =
  | "cycling-regular"
  | "cycling-road"
  | "cycling-mountain"
  | "cycling-electric"
  | "foot-walking";

export const getRoute = async (
  start: Position,
  end: Position,
  mode: Mode = "cycling-regular"
) => {
  const qs = new URLSearchParams({
    api_key: apiKey || "",
    start: `${start.lng},${start.lat}`,
    end: `${end.lng},${end.lat}`,
  });
  const url = `${baseUrl}/v2/directions/${mode}?${qs}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    setRoute(data, start, end);
    return data;
  } catch (error) {
    // TODO: translate
    showToast(`Couldn't display route: ${error.message}`, "error");
    return null;
  }
};
