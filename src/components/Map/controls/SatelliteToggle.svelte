<script lang="ts">
  import { getContext } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { Checkbox } from "flowbite-svelte";
  import MountainSunSolid from "flowbite-svelte-icons/MountainSunSolid.svelte";
  import { mapStore, toggleSatellite } from "../../../store/map";

  $: satellite = $mapStore.satellite;

  let toggleValue = false;

  $: {
    toggleSatellite(toggleValue);
  }

  function syncLocalValue(storeValue) {
    if (toggleValue !== storeValue) {
      toggleValue = storeValue;
    }
  }

  $: {
    syncLocalValue(satellite);
  }

  // tinted if put in component having its own background
  let background: boolean = getContext("background");

  const common =
    "mr-3 shrink-0 bg-gray-200 rounded-full peer-focus:ring-4 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all";
  const primary = "peer-focus:ring-0 peer-checked:bg-primary-500";
  const size = "w-14 h-7 after:top-0.5 after:left-[4px] after:h-6 after:w-6";
  const shadow = "shadow-[0_0.05rem_0.2rem_0_#0005]";

  const icon =
    "relative z-10 w-3 h-3 ml-[.6rem] mt-2 text-gray-800 transition-all";
  const iconChecked = "translate-x-[1.5rem] text-primary-600";

  $: divClass = twMerge(
    common,
    background
      ? "dark:bg-gray-600 dark:border-gray-500"
      : "dark:bg-gray-700 dark:border-gray-600",
    primary,
    size,
    "relative",
    shadow,
    $$props.classDiv
  );
  $: iconClass = twMerge(icon, toggleValue ? iconChecked : "");
</script>

<div class="absolute top-0 left-0 z-10 p-[.6rem]">
  <Checkbox
    custom
    {...$$restProps}
    class={$$props.class}
    bind:checked={toggleValue}
    on:click
    on:change
  >
    <span class={divClass}>
      <MountainSunSolid class={iconClass} />
    </span>
    <slot />
  </Checkbox>
</div>
