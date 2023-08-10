<script>
  import { icons } from "./icons";
  export let name = "stands";
  export let size = 1;
  let svgMap = [
    {
      name: "stands",
      svg: icons.stands,
    },
    {
      name: "wave",
      svg: icons.wave,
    },
    {
      name: "rack",
      svg: icons.rack,
    },
    {
      name: "bollard",
      svg: icons.bollard,
    },
  ];
  let icon;
  $: {
    icon = svgMap.find((e) => e.name === name) || svgMap[0];
  }
</script>

<img src={icon.svg} alt={icon.name} style={`width: ${size}rem;`} />
