<script lang="ts">
  import { getContext } from "svelte";
  import { key, palette, racksSourceName } from "../map.config";

  const { getMap } = getContext(key) as any;
  const map = getMap();

  const clusterConfig = {
    id: "clusters",
    type: "circle",
    source: "racks",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": palette.primary[300],
      "circle-stroke-width": 1.5,
      "circle-stroke-color": palette.primary[500],
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
      "circle-emissive-strength": 1,
    },
  };

  const clustersCountConfig = {
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

  map.on("style.load", () => {
    map.addLayer(clusterConfig);
    map.addLayer(clustersCountConfig);
  });
</script>
