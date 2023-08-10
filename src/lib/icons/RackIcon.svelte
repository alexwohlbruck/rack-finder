<script>
  import stands from "./stands.svg";
  import wave from "./wave.svg";
  import rack from "./rack.svg";
  import bollard from "./bollard.svg";

  export let name = "stands";
  export let size = 1;
  let icons = [
    {
      name: "stands",
      svg: stands,
    },
    {
      name: "wave",
      svg: wave,
    },
    {
      name: "rack",
      svg: rack,
    },
    {
      name: "bollard",
      svg: bollard,
    },
  ];
  let icon = icons.find((e) => e.name === name) || icons[0];
</script>

<img src={icon.svg} alt={icon.name} style={`width: ${size}rem;`} />
