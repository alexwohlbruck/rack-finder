<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "../map.config";
  import { racksSourceName } from "../map.config";

  const { getMap } = getContext(key) as any;
  const map = getMap();

  const config = {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 20,
  };

  map.on("style.load", () => {
    map.addSource(racksSourceName, config);
  });
</script>
