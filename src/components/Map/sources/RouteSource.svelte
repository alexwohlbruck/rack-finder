<script lang="ts">
  import { getContext } from "svelte";
  import { key, routeSourceName } from "../map.config";
  import { mapStore } from "../../../store/map";

  const { getMap } = getContext(key) as any;
  const map = getMap();

  const config = {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  };

  function displayRoute(coordinates) {
    map?.getSource(routeSourceName)?.setData({
      type: "FeatureCollection",
      lineMetrics: true,
      features: [
        {
          type: "Featfure",
          geometry: {
            type: "LineString",
            coordinates,
          },
        },
      ],
    });
  }

  $: {
    const { data: route, start, end } = $mapStore.route;
    if (route) {
      const coordinates = [
        [start.lng, start.lat],
        ...route.features[0].geometry.coordinates,
        [end.lng, end.lat],
      ];
      displayRoute(coordinates);
    } else {
      displayRoute([]);
    }
  }

  map.on("style.load", () => {
    map.addSource("route", config);
  });
</script>
