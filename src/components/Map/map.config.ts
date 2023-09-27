import colors from "tailwindcss/colors";
import { getLocalStorage } from "../../localStorage";

const mapStore = getLocalStorage("map");

export const DEBOUNCE_TIME = 300;
export const DEFAULT_FETCH_RADIUS = 5000;
export const INITIAL_STATE = {
  lng: mapStore?.center?.lng || 0,
  lat: mapStore?.center?.lat || 0,
  zoom: mapStore?.zoom || 0,
};
export const EDIT_MODE_ZOOM = 19;
export const RACKS_LAYER_MAX_ZOOM = 13;
export const RACKS_FETCH_OUTER_BOUNDS_RATIO = (radius) => 2.0 * radius + 2000;

export const racksSourceName = "racks";
export const routeSourceName = "route";

// TODO: Import palette from tailwind config
// import tailwindConfig from "../../tailwind.config.cjs";
// const palette = tailwindConfig.theme.extend.colors;
export const palette = {
  primary: colors.yellow,
  permissive: colors.orange,
  private: colors.rose,
};

export const styles = {
  standard: "mapbox://styles/mapbox/standard-beta",
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
};

// Svelte context api key
export const key = {};

export const mapConfig = {
  accessToken:
    "pk.eyJ1IjoiYWxleHdvaGxicnVjayIsImEiOiJjbGtxNXhibTYwbGJ0M2RuenUybTg3bDZlIn0.lfZIscTvkJKY9P1cxR1nhQ",
  center: [INITIAL_STATE.lng, INITIAL_STATE.lat],
  zoom: INITIAL_STATE.zoom,
  fadeDuration: 200,
  style: styles.standard,
  attributionControl: false,
};
