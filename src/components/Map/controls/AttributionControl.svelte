<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "../map.config";
  import { AttributionControl } from "mapbox-gl";

  const { getMap } = getContext(key) as any;
  const map = getMap();

  const config = {
    compact: true,
  };
  const attributionControl = new AttributionControl(config);

  map.addControl(attributionControl, "bottom-left");
</script>

<style>
  /* TODO: Fix the attribution control button, it's ugly */
</style>
