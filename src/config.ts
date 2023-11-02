function env(key: string) {
  return import.meta.env[`VITE_${key}`];
}

const config = {
  useDevData: env("USE_DEV_DATA") === "true",
  mapboxKey: env("MAPBOX_KEY"),
  osmClientId: env("OSM_CLIENT_ID"),
  overpassUrl: env("OVERPASS_URL"),
  nominatimUrl: env("NOMINATIM_URL"),
  openrouteserviceUrl: env("ORS_URL"),
  openrouteserviceApiKey: env("ORS_API_KEY"),
  openweathermapUrl: env("OWM_URL"),
  openweathermapApiKey: env("OWM_API_KEY"),
  creatorUser: env("OSM_USER_ALEX"),
};

export default config;
