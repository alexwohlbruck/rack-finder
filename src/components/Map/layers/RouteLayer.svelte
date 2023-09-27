<script lang="ts">
  import { getContext } from "svelte";
  import { key, palette } from "../map.config";
  import { routeSourceName } from "../map.config";

  const { getMap } = getContext(key) as any;
  const map = getMap();

  const config = {
    id: "route",
    type: "line",
    source: routeSourceName,
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": palette.primary[500],
      "line-width": 5,
      "line-emissive-strength": 1,
    },
  };

  map.on("style.load", () => {
    map.addLayer(config);
  });
</script>
