<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "../map.config";
  import { prefsStore } from "../../../store/prefs";

  const { getMap } = getContext(key) as any;
  const map = getMap();

  let styleLoaded = false;

  const buildings3dLayerName = "3d-buildings";

  const buildings3dConfig = {
    id: buildings3dLayerName,
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

  function update3dBuildingsLayer() {
    if (!styleLoaded) return;
    if (map.getLayer("satellite") && $prefsStore.prefs.buildings3d) {
      map.addLayer(buildings3dConfig);
    } else {
      if (map.getLayer(buildings3dLayerName)) {
        map.removeLayer(buildings3dLayerName);
      }
    }
  }

  map.on("style.load", () => {
    styleLoaded = true;
    update3dBuildingsLayer();
  });

  $: {
    update3dBuildingsLayer(), $prefsStore.prefs.buildings3d;
  }
</script>
