<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "../map.config";
  import { NavigationControl } from "mapbox-gl";

  const { getMap } = getContext(key) as any;
  const map = getMap();

  export const config = {
    showCompass: true,
    showZoom: true,
    visualizePitch: true,
  };
  const navigationControl = new NavigationControl(config);

  map.addControl(navigationControl);
</script>
