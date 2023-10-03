<script lang="ts">
  import { A, Heading, Modal, P } from "flowbite-svelte";
  import { t } from "../i18n/index";
  import { onMount } from "svelte";
  export let open;

  let count;
  onMount(async () => {
    const response = await fetch(
      "https://rackfinder.goatcounter.com/counter/" +
        encodeURIComponent(location.pathname) +
        ".json"
    );
    const data = await response.json();
    count = data.count;
  });
</script>

<Modal bind:open autoclose outsideclose>
  <Heading tag="h5">{$t("infoModal.title")}</Heading>
  <P>
    {$t("infoModal.uses")}
    <A href="https://openstreetmap.org/" target="_blank"
      >{$t("infoModal.osm")}</A
    >
    {$t("infoModal.data")}
  </P>
  <P
    >{$t("infoModal.free")}
    {$t("infoModal.osm")}
    <A href="https://openstreetmap.org/dashboard" target="_blank">
      {$t("infoModal.account")}
    </A>. {$t("infoModal.contributionsOpenSource")}
    {$t("infoModal.osm")}
    <A href="https://www.openstreetmap.org/copyright" target="_blank">
      {$t("infoModal.license")}
    </A>.
  </P>
  <P>{$t("infoModal.happyCycling")}</P>
  <P size="sm" align="center">
    {$t("infoModal.madeBy")}
    <A href="https://alex.wohlbruck.com" target="_blank">Alex Wohlbruck</A>.
  </P>
  <P size="xs" align="center" class="!mt-2">
    {$t("infoModal.visitCount", { count })}
    {$t("infoModal.view")}
    <A href="https://rackfinder.goatcounter.com" target="_blank">
      {$t("infoModal.analytics")}
    </A>.
  </P>
  <P size="xs" align="center" class="!mt-0">
    {$t("infoModal.viewOn")}
    <A href="https://github.com/alexwohlbruck/rack-finder" target="_blank">
      Github
    </A>.
  </P>
</Modal>
