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
    Button as FlowbiteButton,
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
    "stands",
    "wave",
    "bollard",
    "rack",
    "wall_loops",
    "two-tier",
    "anchors",
    "building",
    "wide_stands",
    "safe_loops",
    "lockers",
    "informal",
    "shed",
  ];
  let showOtherTypes = false;
  const accessOptions = [
    {
      value: "yes",
      name: $t("rack.access.yes"),
    },
    {
      value: "permissive",
      name: `${$t("rack.access.permissive")} (${$t(
        "rack.access.permissiveDescription"
      )})`,
    },
    {
      value: "private",
      name: `${$t("rack.access.private")} (${$t(
        "rack.access.privateDescription"
      )})`,
    },
  ];
  const indoorOptions = [
    {
      value: "yes",
      name: $t("rack.indoors.yes"),
    },
    {
      value: "no",
      name: $t("rack.indoors.no"),
    },
  ];
  const coverageOptions = [
    {
      value: "no",
      name: $t("rack.covered.no"),
    },
    {
      value: "yes",
      name: $t("rack.covered.yes"),
    },
    {
      value: "partial",
      name: $t("rack.covered.partial"),
    },
  ];
  const footTrafficOptions = [
    {
      value: "high",
      name: `${$t("rack.foot_traffic.high")} (${$t(
        "rack.foot_traffic.highDescription"
      )})`,
    },
    {
      value: "medium",
      name: `${$t("rack.foot_traffic.medium")} (${$t(
        "rack.foot_traffic.mediumDescription"
      )})`,
    },
    {
      value: "low",
      name: `${$t("rack.foot_traffic.low")} (${$t(
        "rack.foot_traffic.lowDescription"
      )})`,
    },
    {
      value: "none",
      name: `${$t("rack.foot_traffic.none")} (${$t(
        "rack.foot_traffic.noneDescription"
      )})`,
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

  <div
    class="types grid gap-2 w-full grid-cols-3 sm:grid-cols-5 md:grid-cols-4"
  >
    {#each rackTypeOptions as type}
      <div
        class={showOtherTypes
          ? ""
          : "hidden [&:nth-child(-n+6)]:block sm:[&:nth-child(-n+10)]:block md:[&:nth-child(-n+10)]:hidden md:[&:nth-child(-n+8)]:block"}
      >
        <Radio
          name="custom"
          custom
          value={type}
          bind:group={form.bicycle_parking}
        >
          <div
            class="inline-flex flex-col justify-center items-center gap-1 p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-600 peer-checked:text-primary-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <RackIcon name={type} capacity="1" size={6} />
            <P size="xs" weight="medium" class="text-center"
              >{$t(`rack.type.${type}`)}</P
            >
          </div>
        </Radio>
      </div>
    {/each}
  </div>

  {#if !showOtherTypes}
    <div class="flex flex-col items-center">
      <FlowbiteButton
        outline
        size="xs"
        on:click={() => (showOtherTypes = true)}
      >
        {$t("common.showMore")}
      </FlowbiteButton>
    </div>
  {/if}

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
