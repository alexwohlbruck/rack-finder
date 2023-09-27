<script lang="ts">
  import {
    Card,
    Heading,
    Input,
    Label,
    P,
    Select,
    Spinner,
    Button as FlowbiteButton,
    Textarea,
  } from "flowbite-svelte";
  import Button from "../lib/Button.svelte";
  import { mapStore } from "../store/map";

  import { editBikeRack, addBikeRack } from "../services/osm";
  import { get } from "svelte/store";
  import type { BikeRackTags } from "../types/rack";
  import { t } from "../i18n/index";
  import { push } from "svelte-spa-router";
  import { Icon } from "flowbite-svelte-icons";
  import { racksStore } from "../store/racks";
  import { authStore } from "../store/auth";
  import { getContext } from "svelte";
  import { EDIT_MODE_ZOOM, key } from "./Map/map.config";
  import { location } from "svelte-spa-router";

  const { getMap } = getContext(key) as any;
  const map = getMap();

  export let params: {
    id?: string;
  } = {};

  let loading = false; // TODO: Load bike rack on open
  let submitLoading = false;

  let form: BikeRackTags = {
    bicycle_parking: "stands",
    capacity: 2,
    access: "yes",
  };

  function initForm(originalRack) {
    if (originalRack) {
      form = {
        ...form,
        ...originalRack.tags,
      };
    }
  }

  $: me = $authStore.me;
  $: rack = $racksStore[params.id];
  $: isMyRack = rack?.user === me?.display_name;
  $: editMode = $mapStore.editMode;
  $: contributeMode = $mapStore.contributeMode;
  $: {
    const originalRack = $racksStore[params.id];
    initForm(originalRack);
  }
  $: if (editMode) {
    const rack = $racksStore[$location.split("/")[2]];
    if (rack) {
      map?.flyTo({
        center: [rack.lng, rack.lat],
        pitch: 0,
        zoom: EDIT_MODE_ZOOM,
      });
    }
  }

  // TODO: Get this from type defs
  // TODO: Translate
  const rackTypeOptions = [
    {
      value: "stands",
      name: "Stands",
    },
    {
      value: "wave",
      name: "Wave",
    },
    {
      value: "bollard",
      name: "Bollard",
    },
    {
      value: "rack",
      name: "Rack",
    },
    {
      value: "wall_loops",
      name: "Wall loops",
    },
    {
      value: "building",
      name: "Building",
    },
    {
      value: "two-tier",
      name: "Two tier",
    },
  ];
  const accessOptions = [
    {
      value: "yes",
      name: "Public",
    },
    {
      value: "permissive",
      name: "Permissive (Needs key/code access or must be customer)",
    },
    {
      value: "private",
      name: "Private (Private residence or business)",
    },
  ];
  const indoorOptions = [
    {
      value: "yes",
      name: "Indoors",
    },
    {
      value: "no",
      name: "Outdoors",
    },
  ];
  const coverageOptions = [
    {
      value: "no",
      name: "Exposed",
    },
    {
      value: "yes",
      name: "Covered",
    },
    {
      value: "partial",
      name: "Partially covered",
    },
  ];
  const trafficOptions = [
    {
      value: "high",
      name: "High traffic (Public square, ped path, etc)",
    },
    {
      value: "medium",
      name: "Medium traffic (Nearby a high traffic area, but not directly visible)",
    },
    {
      value: "low",
      name: "Low traffic (Side of building, parking lot, etc)",
    },
    {
      value: "none",
      name: "No traffic (Back of building, alleyway, etc)",
    },
  ];

  async function submit() {
    const mapCenter = get(mapStore).center;
    const payload = {
      // TODO: This should be marker position, not map center
      lat: mapCenter.lat,
      lng: mapCenter.lng,
      tags: form,
      description: form.description ? form.description : undefined,
    };
    submitLoading = true;
    if (editMode) {
      await editBikeRack(
        {
          id: parseInt(rack.id),
          version: rack.version,
          ...payload,
        },
        !isMyRack
      ); // TODO: Type error
    } else {
      await addBikeRack(payload); // TODO: Type error
    }
    push("/");
    submitLoading = false;
  }
</script>

<Card padding="none" class="flex flex-1 flex-col gap-4 p-3 overflow-x-hidden">
  <div class="flex gap-2 items-center">
    <div class="flex items-center">
      <Button size="sm" color="none" class="w-9 h-9" href="#/">
        <Icon name="arrow-left-solid" class="w-4 h-4 outline-none" />
      </Button>
    </div>
    <div class="flex items-start">
      <div class="flex-1">
        <Heading tag="h6">
          {$t(`rackForm.${editMode ? "editTitle" : "addTitle"}`)}
        </Heading>
        <P size="xs">{$t("rackForm.instruction")}</P>
      </div>
    </div>
  </div>

  <Label for="type">
    <div class="mb-1">{$t("rack.attributes.type")}</div>
    <Select
      bind:value={form.bicycle_parking}
      id="type"
      items={rackTypeOptions}
      required
      placeholder={$t("common.chooseOption")}
    />
  </Label>

  <Label for="capacity">
    <div class="mb-1">{$t("rack.attributes.capacity")}</div>
    <Input
      bind:value={form.capacity}
      id="capacity"
      type="number"
      required
      min="1"
    />
  </Label>

  <Label for="access">
    <div class="mb-1">{$t("rack.attributes.access")}</div>
    <Select
      bind:value={form.access}
      id="access"
      items={accessOptions}
      placeholder={$t("common.chooseOption")}
    />
  </Label>

  <Label for="covered">
    <div class="mb-1">{$t("rack.attributes.covered")}</div>
    <Select
      bind:value={form.covered}
      id="covered"
      items={coverageOptions}
      placeholder={$t("common.chooseOption")}
    />
  </Label>

  <Label for="traffic">
    <div class="mb-1">{$t("rack.attributes.traffic")}</div>
    <Select
      bind:value={form.traffic}
      id="traffic"
      items={trafficOptions}
      placeholder={$t("common.chooseOption")}
    />
  </Label>

  <Label for="indoor">
    <div class="mb-1">{$t("rack.attributes.indoor")}</div>
    <Select
      bind:value={form.indoor}
      id="indoor"
      items={indoorOptions}
      placeholder={$t("common.chooseOption")}
    />
  </Label>

  <Label for="description">
    <div class="mb-1">{$t("rack.attributes.description")}</div>
    <Textarea
      bind:value={form.description}
      id="description"
      rows="3"
      class="bg-gray-50 dark:bg-gray-700"
    />
  </Label>

  <div class="flex-1" />
  <Button on:click={submit}>
    {#if submitLoading}
      <Spinner class="mr-3" size="5" color="gray" />
    {/if}
    {$t(editMode ? "common.save" : "rackForm.addToMap")}
  </Button>
</Card>
