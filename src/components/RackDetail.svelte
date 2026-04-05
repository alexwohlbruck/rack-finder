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
  import { racksStore, searchOptionsStore } from "../store/racks";
  import {
    friendlyName,
    haversine,
    osmElementUrl,
    osmProfileUrl,
    renderDistance,
  } from "../util";
  import { reverseLookup } from "../services/nominatim";
  import { type Rack } from "../types/rack";
  import RackIcon from "../lib/icons/RackIcon.svelte";
  import BirdIcon from "../lib/icons/BirdIcon.svelte";
  import BikeIcon from "../lib/icons/BikeIcon.svelte";
  import config from "../config";
  import { locationStore } from "../store/location";
  import { clearRoute, mapStore } from "../store/map";
  import { getRoute } from "../services/ors";
  import { getContext, onDestroy } from "svelte";
  import DeleteConfirmationModal from "./DeleteConfirmationModal.svelte";
  import { push } from "svelte-spa-router";
  import { EDIT_MODE_ZOOM, key } from "./Map/map.config";
  import { LngLatBounds } from "mapbox-gl";
  import { preferredUnits, prefsStore } from "../store/prefs";
  import {
    ArrowLeftSolid,
    ArrowUpRightFromSquareOutline,
    MapPinAltSolid,
    PenOutline,
    TrashBinSolid,
  } from "flowbite-svelte-icons";
  import { authenticate, checkAuthenticated } from "../services/osm";

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
    "access",
    "indoor",
    "description",
  ];

  $: rack = $racksStore[params.id];
  $: tags = rack?.tags;

  let lastId;
  let cycleDistance = 0;
  let directDistance = 0;

  $: {
    if (rack && (rack.id !== lastId || $mapStore.route.data === null)) {
      lastId = rack.id;
      loadDetails();
    }
  }
  $: {
    if ($mapStore.route?.data) {
      cycleDistance =
        $mapStore.route.data.features[0].properties.summary.distance;
      const start = $locationStore;
      const end = rack;
      if (start && end) {
        directDistance = haversine(start, end);
      }
    } else {
      cycleDistance = 0;
      directDistance = 0;
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

  function editRack() {
    if (checkAuthenticated()) {
      push(`/racks/${params.id}/edit`);
    } else {
      authenticate();
    }
  }

  function deleteRack() {
    if (checkAuthenticated()) {
      deleteConfirmationModal = true;
    } else {
      authenticate();
    }
  }

  onDestroy(() => {
    clearRoute();
  });
</script>

<DeleteConfirmationModal bind:open={deleteConfirmationModal} bind:rack />

<Card padding="none" class="flex-1 flex flex-col overflow-x-hidden">
  {#if rack}
    <div class="p-3 flex items-center">
      <div class="flex items-center">
        <Button size="sm" color="none" class="w-9 h-9" href="#/">
          <ArrowLeftSolid class="w-4 h-4 outline-none" />
        </Button>
      </div>
      <div class="px-1 mr-1">
        <RackIcon
          name={tags.bicycle_parking}
          capacity={tags.capacity}
          size={7}
        />
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
      <div class="flex items-end flex-col">
        {#if cycleDistance}
          <div class="flex items-center">
            <P size="xs" weight="medium">
              {renderDistance(cycleDistance, $preferredUnits)}
            </P>
            <BikeIcon class="w-5 ml-2" />
          </div>
        {/if}
        {#if directDistance}
          <div class="flex items-center">
            <P size="xs" weight="medium">
              {renderDistance(directDistance, $preferredUnits)}
            </P>
            <BirdIcon class="w-5 ml-2" />
          </div>
        {/if}
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
                <ArrowUpRightFromSquareOutline class="w-4 h-4 outline-none" />
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
          on:click={editRack}
        >
          <PenOutline class="w-4 h-4 mr-2" />
          <span>{$t("common.edit")}</span>
        </FlowbiteButton>
        <FlowbiteButton on:click={deleteRack} color="primary" outline size="sm">
          <TrashBinSolid class="w-4 h-4 mr-2" />
          <span>{$t("common.delete")}</span>
        </FlowbiteButton>
      </ButtonGroup>

      <div class="flex-1" />

      <Button size="sm" href={directionsUrl} target="_blank">
        <MapPinAltSolid class="w-4 h-4 mr-2" />
        <span>{$t("rackDetail.navigate")}</span>
      </Button>
    </div>
  {/if}
</Card>
