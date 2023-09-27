<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "../map.config";
  import { asSvg as icons } from "../../../lib/icons/icons";

  const { getMap } = getContext(key) as any;
  const map = getMap();

  function initIcons() {
    Object.entries(icons).forEach(([name, path]) => {
      let img = new Image(20, 20);
      img.onload = () => map.addImage(name, img);
      img.src = path;
    });
  }

  map.on("style.load", () => {
    initIcons();
  });
</script>
