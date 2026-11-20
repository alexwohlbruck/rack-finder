function env(key: string) {
  return import.meta.env[`VITE_${key}`];
}

const config = {
  useDevData: env("USE_DEV_DATA") === "true",
  mapboxKey: env("MAPBOX_KEY"),
  osmClientId: env("OSM_CLIENT_ID"),
  // Comma-separated list; queries rotate across these and fail over
  overpassUrls: (
    env("OVERPASS_URLS") ||
    [
      "https://overpass-api.de/api/interpreter",
      "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
      "https://overpass.private.coffee/api/interpreter",
      "https://overpass.kumi.systems/api/interpreter",
    ].join(",")
  )
    .split(",")
    .map((url: string) => url.trim())
    .filter(Boolean),
  barrelmanUrl: env("BARRELMAN_URL") || "https://api.barrelman.dev",
  // Browser key: scoped to search/places/tiles and restricted to the app's
  // origins in the Barrelman console, so it is safe to ship in the bundle
  barrelmanApiKey:
    env("BARRELMAN_API_KEY") ||
    "brm_live_ptA1pvmgfZ3a3O9bgjaxm3YLa3H4y1h20WITEnGd",
  nominatimUrl: env("NOMINATIM_URL"),
  openrouteserviceUrl: env("ORS_URL"),
  openrouteserviceApiKey: env("ORS_API_KEY"),
  openweathermapUrl: env("OWM_URL"),
  openweathermapApiKey: env("OWM_API_KEY"),
  creatorUser: env("OSM_USER_ALEX"),
};

export default config;
