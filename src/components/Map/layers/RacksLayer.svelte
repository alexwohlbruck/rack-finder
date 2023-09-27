<script lang="ts">
  import { getContext } from "svelte";
  import { key, palette, racksSourceName } from "../map.config";
  import { push } from "svelte-spa-router";
  import type { Rack } from "../../../types/rack";
  import type { IconName } from "../../../lib/icons/icons";
  import { racksStore } from "../../../store/racks";

  const { getMap } = getContext(key) as any;
  const map = getMap();

  const unclusteredPointLayerName = "unclustered-point";
  const unclusteredPointConfig = {
    id: unclusteredPointLayerName,
    type: "circle",
    source: racksSourceName,
    filter: ["!", ["has", "point_count"]],
    paint: {
      // private, permissive, public, shade 100
      "circle-color": [
        "case",
        ["==", ["get", "access"], "private"],
        palette.private[100],
        ["==", ["get", "access"], "permissive"],
        palette.permissive[100],
        palette.primary[100],
      ],
      "circle-radius": 10,
      "circle-stroke-width": 2,
      "circle-stroke-color": [
        "case",
        ["==", ["get", "access"], "private"],
        palette.private[300],
        ["==", ["get", "access"], "permissive"],
        palette.permissive[300],
        palette.primary[300],
      ],
      "circle-emissive-strength": 1,
    },
  };

  const iconConfig = {
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

  map.on("style.load", () => {
    setRacksData($racksStore);
    map.addLayer(unclusteredPointConfig);
    map.addLayer(iconConfig);
  });

  // On rack icon click
  map.on("click", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: [unclusteredPointLayerName],
    });
    if (!features?.length) return;
    const rackId = features[0]?.properties?.id;
    push(`#/racks/${rackId}`);
  });

  map.on("mouseenter", unclusteredPointLayerName, () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", unclusteredPointLayerName, () => {
    map.getCanvas().style.cursor = "";
  });

  function setRacksData(racks) {
    map?.getSource(racksSourceName)?.setData({
      type: "FeatureCollection",
      features: Object.values(racks).map((rack: Rack) => {
        let icon: IconName | string = rack.tags.bicycle_parking;
        // TODO: Dupe logic from RackIcon.svelte
        if (icon === "stands" && rack.tags.capacity > 2) {
          icon = "stands_multi";
        }
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [rack.lng, rack.lat],
          },
          properties: {
            id: rack.id,
            icon,
            cluster: true,
            access: rack.tags.access,
          },
        };
      }),
    });
  }

  $: {
    const racks = $racksStore;
    setRacksData(racks);
  }
</script>
