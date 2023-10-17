<script lang="ts">
  import {
    Card,
    Heading,
    Input,
    Label,
    P,
    Select,
    Spinner,
    Radio,
    Textarea,
  } from "flowbite-svelte";
  import Button from "../lib/Button.svelte";
  import { mapStore } from "../store/map";

  import { editBikeRack, addBikeRack } from "../services/osm";
  import { get } from "svelte/store";
  import type { BikeRackTags } from "../types/rack";
  import { t } from "../i18n/index";
  import { push } from "svelte-spa-router";
  import { racksStore } from "../store/racks";
  import { authStore } from "../store/auth";
  import { getContext } from "svelte";
  import { EDIT_MODE_ZOOM, key } from "./Map/map.config";
  import { location } from "svelte-spa-router";
  import { prefsStore } from "../store/prefs";
  import { ArrowLeftSolid } from "flowbite-svelte-icons";
  import RackIcon from "../lib/icons/RackIcon.svelte";

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
        duration: $prefsStore.prefs.animationSpeedMs,
      });
    }
  }
  $: {
    if (form.covered === "no" || form.covered === "partial") {
      form.indoor = "no";
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
    // {
    //   value: "building",
    //   name: "Building",
    // },
    // {
    //   value: "two-tier",
    //   name: "Two tier",
    // },
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
  const footTrafficOptions = [
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
        <ArrowLeftSolid class="w-4 h-4 outline-none" />
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
    <div>{$t("rack.attributes.type")}</div>
  </Label>

  <div class="grid gap-2 w-full grid-cols-3 sm:grid-cols-5 md:grid-cols-4">
    {#each rackTypeOptions as type}
      <Radio
        name="custom"
        custom
        value={type.value}
        bind:group={form.bicycle_parking}
      >
        <div
          class="inline-flex flex-col justify-center items-center gap-1 p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-600 peer-checked:text-primary-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <RackIcon name={type.value} capacity="1" size={6} />
          <P size="xs" weight="medium">{type.name}</P>
        </div>
      </Radio>
    {/each}
  </div>

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

  <Label for="foot_traffic">
    <div class="mb-1">{$t("rack.attributes.foot_traffic")}</div>
    <Select
      bind:value={form.foot_traffic}
      id="foot_traffic"
      items={footTrafficOptions}
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
