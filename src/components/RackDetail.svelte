<script lang="ts">
  import {
    A,
    Badge,
    Button as FlowbiteButton,
    ButtonGroup,
    Card,
    Heading,
    Listgroup,
    ListgroupItem,
    P,
  } from "flowbite-svelte";
  import Button from "../lib/Button.svelte";
  import { t } from "../i18n";
  import { racksStore } from "../store/racks";
  import { friendlyName, osmElementUrl, osmProfileUrl } from "../util";
  import { reverseLookup } from "../services/nominatim";
  import { type Rack } from "../types/rack";
  import { Icon } from "flowbite-svelte-icons";
  import RackIcon from "../lib/icons/RackIcon.svelte";
  import config from "../config";
  import { locationStore } from "../store/location";
  import { clearRoute, mapStore } from "../store/map";
  import { getRoute } from "../services/ors";
  import { getContext, onDestroy } from "svelte";
  import DeleteConfirmationModal from "./DeleteConfirmationModal.svelte";
  import { push } from "svelte-spa-router";
  import { EDIT_MODE_ZOOM, key } from "./Map/map.config";
  import { LngLatBounds } from "mapbox-gl";
  import { prefsStore } from "../store/prefs";

  const { getMap } = getContext(key) as any;
  const map = getMap();

  export let params: {
    id?: string;
  } = {};

  // TODO: Load bike rack on open

  let deleteConfirmationModal = false;

  let address;
  // TODO: Move out of here
  const knownAttributes = [
    "amenity",
    "bicycle_parking",
    "capacity",
    "covered",
    "traffic",
    "access",
    "indoor",
    "description",
  ];

  $: rack = $racksStore[params.id];
  $: tags = rack?.tags;

  let lastId;
  $: {
    if (rack && (rack.id !== lastId || $mapStore.route.data === null)) {
      lastId = rack.id;
      loadDetails();
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
  $: unknownAttributes = tags
    ? Object.keys(tags).filter((key) => !knownAttributes.includes(key))
    : [];

  async function lookupAddress(rack: Rack) {
    if (rack) {
      const result = await reverseLookup({
        lat: rack.lat,
        lng: rack.lng,
      });
      address = result?.address;
    }
  }

  function fitCameraToRoute(coordinates: number[][]) {
    const start = coordinates[0];
    const end = coordinates[coordinates.length - 1];
    const bbox = [start[0], start[1], end[0], end[1]];
    const bounds = coordinates.reduce(
      (bounds, coord) => bounds.extend(coord),
      new LngLatBounds(bbox.slice(0, 2), bbox.slice(2, 4))
    );
    // Bearing with start facing south and end facing north
    const bearingRadians = Math.atan2(end[0] - start[0], end[1] - start[1]);
    const bearing = (bearingRadians * 180) / Math.PI;

    map?.fitBounds(bounds, {
      padding: Math.floor(window.innerWidth * 0.1),
      bearing,
      pitch: 40,
      duration: $prefsStore.prefs.animationSpeedMs,
    });
  }

  function loadDetails() {
    lookupAddress(rack);
    const end = [rack.lng, rack.lat];
    const coordinates = [];
    if ($locationStore?.lat && $locationStore?.lng) {
      const start = [$locationStore.lng, $locationStore.lat];
      coordinates.push(start);
      getRoute($locationStore, rack);
      coordinates.push(end);
      fitCameraToRoute(coordinates);
    } else {
      map.flyTo({
        center: end,
        zoom: EDIT_MODE_ZOOM,
        duration: $prefsStore.prefs.animationSpeedMs,
      });
    }
  }

  onDestroy(() => {
    clearRoute();
  });
</script>

<DeleteConfirmationModal bind:open={deleteConfirmationModal} bind:rack />

<Card padding="none" class="flex-1 flex flex-col overflow-x-hidden">
  {#if rack}
    <div class="p-3 flex gap-2 items-center">
      <div class="flex items-center">
        <Button size="sm" color="none" class="w-9 h-9" href="#/">
          <Icon name="arrow-left-solid" class="w-4 h-4 outline-none" />
        </Button>
      </div>
      <div class="flex-1 flex flex-col">
        <Heading tag="h6">
          {rack?.tags.bicycle_parking
            ? $t(`rack.type.${rack?.tags.bicycle_parking}`)
            : $t("rack.type.unknown")}
        </Heading>
        <P size="xs">
          {$t("rackDetail.location", {
            location,
          })}
        </P>
      </div>
      <div class="mx-2">
        <RackIcon
          name={tags.bicycle_parking}
          capacity={tags.capacity}
          size={7}
        />
      </div>
    </div>

    <Listgroup
      class="flex-1 overflow-y-auto overflow-x-hidden rounded-t-none rounded-b-none border-x-0"
    >
      {#if tags.description}
        <ListgroupItem>
          <div class="flex flex-col">
            <P size="sm">{$t("rack.attributes.description")}</P>
            <P size="sm" weight="medium">{tags.description}</P>
          </div>
        </ListgroupItem>
      {/if}
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
            <P size="sm" weight="medium">{$t(`rack.covered.${tags.covered}`)}</P
            >
          </div>
        </ListgroupItem>
      {/if}
      {#if tags.indoor}
        <ListgroupItem>
          <div class="flex flex-col">
            <P size="sm">{$t("rack.attributes.indoor")}</P>
            <P size="sm" weight="medium">
              {$t(tags.indoor === "yes" ? "common.yes" : "common.no")}
            </P>
          </div>
        </ListgroupItem>
      {/if}
      {#if tags.traffic}
        <ListgroupItem>
          <div class="flex flex-col">
            <P size="sm">{$t("rack.attributes.traffic")}</P>
            <P size="sm" weight="medium">{$t(`rack.traffic.${tags.traffic}`)}</P
            >
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
            <div class="flex items-center gap-2">
              {#if rack.user === config.creatorUser}
                <Badge color="primary">{$t("rackDetail.creator")}</Badge>
              {/if}
              <FlowbiteButton
                size="xs"
                outline
                href={osmElementUrl(rack.type, rack.id)}
                target="_blank"
              >
                <Icon
                  name="arrow-up-right-from-square-outline"
                  class="w-4 h-4 outline-none"
                />
              </FlowbiteButton>
            </div>
          </div>
        </ListgroupItem>
      {/if}
    </Listgroup>

    <div class="p-3 flex">
      <ButtonGroup>
        <FlowbiteButton
          color="primary"
          outline
          size="sm"
          disabled={rack?.type === "way"}
          on:click={() => push(`/racks/${params.id}/edit`)}
        >
          <Icon name="pen-outline" class="w-4 h-4 mr-2" />
          <span>{$t("common.edit")}</span>
        </FlowbiteButton>
        <FlowbiteButton
          on:click={() => (deleteConfirmationModal = true)}
          color="primary"
          outline
          size="sm"
        >
          <Icon name="trash-bin-solid" class="w-4 h-4 mr-2" />
          <span>{$t("common.delete")}</span>
        </FlowbiteButton>
      </ButtonGroup>

      <div class="flex-1" />

      <Button size="sm" href={directionsUrl} target="_blank">
        <Icon name="map-pin-alt-solid" class="w-4 h-4 mr-2" />
        <span>{$t("rackDetail.navigate")}</span>
      </Button>
    </div>
  {/if}
</Card>
