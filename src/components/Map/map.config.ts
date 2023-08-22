import colors from "tailwindcss/colors";

export const DEBOUNCE_TIME = 300;
export const INITIAL_STATE = {
  lng: -30.6271504,
  lat: 29.108255,
  zoom: 2,
};
export const RACKS_LAYER_MAX_ZOOM = 11;
export const RACKS_FETCH_OUTER_BOUNDS_RATIO = (radius) => 2.0 * radius + 1000;
// TODO: Import palette from tailwind config
// import tailwindConfig from "../../tailwind.config.cjs";
// const palette = tailwindConfig.theme.extend.colors;
export const palette = colors.yellow;
export const styles = {
  light: "mapbox://styles/mapbox/streets-v12",
  dark: "mapbox://styles/mapbox/dark-v11",
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
};

export const mapConfig = {
  accessToken:
    "pk.eyJ1IjoiYWxleHdvaGxicnVjayIsImEiOiJjbGtxNXhibTYwbGJ0M2RuenUybTg3bDZlIn0.lfZIscTvkJKY9P1cxR1nhQ",
  style: styles.light,
  center: [INITIAL_STATE.lng, INITIAL_STATE.lat],
  zoom: INITIAL_STATE.zoom,
  fadeDuration: 200,
};

export const geolocateControlConfig = {
  positionOptions: {
    enableHighAccuracy: true,
  },
  trackUserLocation: true,
  showUserHeading: true,
  fitBoundsOptions: {
    maxZoom: 18,
  },
};

export const navigationControlConfig = {
  showCompass: true,
  showZoom: true,
  visualizePitch: true,
};

export const racksSourceName = "racks";

export const racksLayer = {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-80.843124, 35.227085],
        },
        properties: {
          id: "1",
          cluster: true,
        },
      },
    ],
  },
  cluster: true,
  clusterMaxZoom: 14,
  clusterRadius: 20,
};

export const clustersLayer = {
  id: "clusters",
  type: "circle",
  source: "racks",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": palette[300],
    "circle-stroke-width": 1.5,
    "circle-stroke-color": palette[500],
    "circle-radius": [
      "step",
      ["get", "point_count"],
      10,
      5,
      15,
      10,
      20,
      20,
      25,
      50,
      30,
      100,
      33,
      500,
      37,
      1000,
      40,
    ],
  },
};

export const clustersCountLayer = {
  id: "cluster-count",
  type: "symbol",
  source: racksSourceName,
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

export const unclusteredPointLayer = {
  id: "unclustered-point",
  type: "circle",
  source: racksSourceName,
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": palette[100],
    "circle-radius": 10,
    "circle-stroke-width": 2,
    "circle-stroke-color": palette[300],
  },
};

export const iconsLayer = {
  id: "icons",
  type: "symbol",
  source: racksSourceName,
  filter: ["!", ["has", "point_count"]],
  layout: {
    "icon-size": 0.65,
    "icon-allow-overlap": true,
    "icon-image": ["coalesce", ["get", "icon"], "stands"],
  },
};

export const buildingsLayer = {
  id: "add-3d-buildings",
  source: "composite",
  "source-layer": "building",
  filter: ["==", "extrude", "true"],
  type: "fill-extrusion",
  minzoom: 10,
  paint: {
    "fill-extrusion-color": "#aaa",
    "fill-extrusion-height": [
      "interpolate",
      ["linear"],
      ["zoom"],
      10,
      0,
      10.05,
      ["get", "height"],
    ],
    "fill-extrusion-base": [
      "interpolate",
      ["linear"],
      ["zoom"],
      10,
      0,
      10.05,
      ["get", "min_height"],
    ],
    "fill-extrusion-opacity": 0.6,
  },
};
