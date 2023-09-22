<script lang="ts">
  import {
    Card,
    Heading,
    Button as FlowbiteButton,
    P,
    Alert,
    Button,
  } from "flowbite-svelte";
  import RacksList from "./RacksList.svelte";
  import { racks, searchOptionsStore } from "../store/racks";
  import SearchOptionsModal from "./SearchOptionsModal.svelte";
  import { t } from "../i18n/index";
  import { getForecast } from "../services/owm";
  import { Icon } from "flowbite-svelte-icons";
  import RainIcon from "../lib/icons/RainIcon.svelte";
  import { locationStore } from "../store/location";

  let searchOptionsModal = false;
  let fetchedForecast = false;
  let timeOfPrecipitation = null;
  const rainWarningThresholdHours = 6;

  $: showRainWarning =
    timeOfPrecipitation && $searchOptionsStore.filter.covered.includes("no");

  async function checkPrecipitation() {
    const { lat, lng } = $locationStore;
    const { hourly } = await getForecast(lat, lng);
    fetchedForecast = true;

    for (const [i, hour] of hourly.entries()) {
      const { main } = hour.weather[0];
      if (i >= rainWarningThresholdHours) break;
      if (["Rain", "Drizzle", "Thunderstorm"].includes(main)) {
        const timestamp = new Date(hour.dt * 1000);
        // Don't add leading zero to hour
        timeOfPrecipitation = timestamp.toLocaleTimeString([], {
          hour: "numeric",
        });
        break;
      }
    }
  }

  function filterCovered() {
    $searchOptionsStore.filter.covered = ["yes"];
  }

  $: {
    if (!fetchedForecast && $locationStore.lat && $locationStore.lng) {
      checkPrecipitation();
    }
  }
</script>

<SearchOptionsModal bind:open={searchOptionsModal} />

<Card padding="none" class="flex-1 flex flex-col overflow-x-hidden">
  <div class="p-3 flex gap-2 justify-between items-center">
    <div>
      <Heading tag="h6">{$t("nearbyRacksPanel.title")}</Heading>
      <P size="xs" weight="medium">
        {$t("nearbyRacksPanel.matchingResults", { count: $racks.length })}
      </P>
    </div>
    <FlowbiteButton
      on:click={() => (searchOptionsModal = true)}
      outline
      color="primary"
      size="xs"
    >
      <Icon name="adjustments-horizontal-outline" class="w-4 h-4 mr-2" />
      {$t("nearbyRacksPanel.sortFilter")}
    </FlowbiteButton>
  </div>

  {#if showRainWarning}
    <Alert color="blue" class="rounded-none dark:bg-blue-500/10">
      <div class="flex items-center gap-3">
        <RainIcon class="w-5 h-5" />

        <div class="flex flex-col flex-1">
          <span class="text-sm font-medium">
            {$t("nearbyRacksPanel.rainExpected", { time: timeOfPrecipitation })}
          </span>
          <p class="mb-4 text-xs mb-0">
            {$t("nearbyRacksPanel.narrowSearch")}
          </p>
        </div>
        <div class="flex gap-2">
          <Button color="blue" size="xs" on:click={filterCovered}>
            {$t("nearbyRacksPanel.filterCovered")}
          </Button>
        </div>
      </div>
    </Alert>
  {/if}

  <div
    class="flex-1 overflow-y-auto overflow-x-hidden border-t border-gray-200 dark:border-gray-700"
  >
    <RacksList />
  </div>
</Card>
