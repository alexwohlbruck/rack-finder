<script lang="ts">
  import { getContext } from "svelte";
  import { key, palette, racksSourceName } from "../map.config";
  import { prefsStore } from "../../../store/prefs";

  const { getMap } = getContext(key) as any;
  const map = getMap();

  const clusterLayerName = "clusters";

  const clusterConfig = {
    id: clusterLayerName,
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

  // Zoom to cluster on click
  map.on("click", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: [clusterLayerName],
    });
    if (!features?.length) return;
    const clusterId = features[0]?.properties?.cluster_id;
    map
      .getSource(racksSourceName)
      .getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;
        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom + 1.5,
          duration: $prefsStore.prefs.animationSpeedMs,
        });
      });
  });

  map.on("mouseenter", clusterLayerName, () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", clusterLayerName, () => {
    map.getCanvas().style.cursor = "";
  });
</script>
