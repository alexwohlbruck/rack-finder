<script lang="ts">
  import {
    A,
    Badge,
    Button,
    Card,
    Heading,
    Listgroup,
    ListgroupItem,
    P,
  } from "flowbite-svelte";
  import { t } from "../i18n";
  import { racksStore } from "../store/racks";
  import { friendlyName, osmProfileUrl } from "../util";
  import { reverseLookup } from "../services/nominatim";
  import type { Rack } from "../types/rack";
  import { setMapCenter } from "../store/map";
  import { Icon } from "flowbite-svelte-icons";
  import RackIcon from "../lib/icons/RackIcon.svelte";
  import config from "../config";
  import { locationStore } from "../store/location";
  import { getRoute } from "../services/ors";
  import { onDestroy } from "svelte";
  import { setRoute } from "../store/route";

  export let params: {
    id?: string;
  } = {};

  let address;
  const knownAttributes = [
    "amenity",
    "bicycle_parking",
    "capacity",
    "covered",
    "traffic",
    "access",
  ];

  $: rack = $racksStore[params.id];
  $: tags = rack?.tags;
  $: {
    if (rack) {
      lookupAddress(rack);
      console.log(locationStore);
      if ($locationStore?.lat && $locationStore?.lng) {
        getRoute($locationStore, rack);
      }
    }
  }
  $: location = address
    ? `${address.road}, ${address.city}`
    : `${rack?.lat}, ${rack?.lng}`;
  let directionsUrl;
  $: {
    const qs = new URLSearchParams({
      daddr: `${rack?.lat},${rack?.lng}`,
      saddr: "Current Location",
      dirflg: "b",
    });
    directionsUrl = `http://maps.apple.com/?${qs.toString()}`;
  }
  $: unknownAttributes = Object.keys(tags).filter(
    (key) => !knownAttributes.includes(key)
  );

  async function lookupAddress(rack: Rack) {
    if (rack) {
      const result = await reverseLookup(rack);
      address = result?.address;
    }
  }

  onDestroy(() => {
    setRoute(null);
  });
</script>

<Card padding="none" class="flex flex-1 flex-col">
  <div class="p-3 flex gap-2 items-center">
    <div class="flex items-center">
      <Button size="sm" color="none" class="w-9 h-9" href="#/">
        <Icon name="arrow-left-solid" class="w-4 h-4 outline-none" />
      </Button>
    </div>
    <div class="flex-1 flex flex-col">
      <Heading tag="h6">
        {$t(`rack.type.${rack?.tags.bicycle_parking}`)}
      </Heading>
      <P size="xs">
        {$t("rackDetail.location", {
          location,
        })}
      </P>
    </div>
    <div class="mx-2">
      <RackIcon name={tags.bicycle_parking} capacity={tags.capacity} size={7} />
    </div>
  </div>

  <Listgroup class="rounded-t-none rounded-b-none border-x-0">
    {#if tags.capacity}
      <ListgroupItem>
        <div class="flex flex-col">
          <P size="sm">{$t("rack.attributes.capacity")}</P>
          <P size="sm" weight="medium"
            >{$t(`rack.capacity`, { count: parseInt(tags.capacity) })}</P
          >
        </div>
      </ListgroupItem>
    {/if}
    {#if tags.covered}
      <ListgroupItem>
        <div class="flex flex-col">
          <P size="sm">{$t("rack.attributes.covered")}</P>
          <P size="sm" weight="medium">{$t(`rack.covered.${tags.covered}`)}</P>
        </div>
      </ListgroupItem>
    {/if}
    {#if tags.traffic}
      <ListgroupItem>
        <div class="flex flex-col">
          <P size="sm">{$t("rack.attributes.traffic")}</P>
          <P size="sm" weight="medium">{$t(`rack.traffic.${tags.traffic}`)}</P>
        </div>
      </ListgroupItem>
    {/if}
    {#if tags.access}
      <ListgroupItem>
        <div class="flex flex-col">
          <P size="sm">{$t("rack.attributes.access")}</P>
          <P size="sm" weight="medium">{$t(`rack.access.${tags.access}`)}</P>
        </div>
      </ListgroupItem>
    {/if}
    {#each unknownAttributes as key}
      <ListgroupItem>
        <div class="flex flex-col">
          <P size="sm">{friendlyName(key)}</P>
          <P size="sm" weight="medium">{friendlyName(tags[key])}</P>
        </div>
      </ListgroupItem>
    {/each}
    {#if rack.user}
      <ListgroupItem>
        <div class="flex items-center">
          <div class="flex-1 flex flex-col">
            <P size="sm">{$t("rackDetail.attribution")}</P>
            <P size="sm" weight="medium">
              <A href={osmProfileUrl(rack.user)} target="_blank">
                {rack.user}
              </A>
            </P>
          </div>
          {#if rack.user === config.creatorUser}
            <Badge color="primary">{$t("rackDetail.creator")}</Badge>
          {/if}
        </div>
      </ListgroupItem>
    {/if}
  </Listgroup>

  <div class="p-3 flex">
    <div class="flex-1" />
    <Button outline size="sm" href={directionsUrl} target="_blank">
      <Icon name="map-pin-alt-solid" class="w-4 h-4 mr-2" />
      <span>{$t("rackDetail.navigate")}</span>
    </Button>
  </div>
</Card>
