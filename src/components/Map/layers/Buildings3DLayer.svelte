<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "../map.config";

  const { getMap } = getContext(key) as any;
  const map = getMap();

  const buildings3dConfig = {
    id: "3d-buildings",
    source: "composite",
    "source-layer": "building",
    filter: ["==", "extrude", "true"],
    type: "fill-extrusion",
    minzoom: 15,
    paint: {
      "fill-extrusion-color": "#fff",
      "fill-extrusion-opacity": 0.6,
      // Use an 'interpolate' expression to
      // add a smooth transition effect to
      // the buildings as the user zooms in.
      "fill-extrusion-height": [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        15.05,
        ["get", "height"],
      ],
      "fill-extrusion-base": [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        15.05,
        ["get", "min_height"],
      ],
    },
  };

  map.on("style.load", () => {
    map.addLayer(buildings3dConfig);
  });
</script>
