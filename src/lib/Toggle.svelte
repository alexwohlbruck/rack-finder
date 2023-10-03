<script lang="ts">
  import { getContext } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { Checkbox } from "flowbite-svelte";
  import MountainSunSolid from "flowbite-svelte-icons/MountainSunSolid.svelte";

  export let group: (string | number)[] = [];
  export let value: string | number = "";
  export let checked: boolean | undefined = undefined;

  // tinted if put in component having its own background
  let background: boolean = getContext("background");

  const common =
    "mr-3 shrink-0 bg-gray-200 rounded-full peer-focus:ring-4 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all";
  const primary = "peer-focus:ring-0 peer-checked:bg-primary-500";
  const size = "w-14 h-7 after:top-0.5 after:left-[4px] after:h-6 after:w-6";
  const shadow = "shadow-[0_0.05rem_0.3rem_0_#000a]";

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
  $: iconClass = twMerge(icon, checked ? iconChecked : "");
</script>

<Checkbox
  custom
  {...$$restProps}
  class={$$props.class}
  {value}
  bind:checked
  bind:group
  on:click
  on:change
>
  <span class={divClass}>
    <MountainSunSolid class={iconClass} />
  </span>
  <slot />
</Checkbox>
