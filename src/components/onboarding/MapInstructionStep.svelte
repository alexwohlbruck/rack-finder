<script>
  import { DropdownDivider, Heading, P } from "flowbite-svelte";
  import Button from "../../lib/Button.svelte";
  import { Icon } from "flowbite-svelte-icons";
</script>

<div class="flex flex-col gap-5 items-center">
  <div class="relative w-14 h-14">
    <Icon
      name="map-pin-alt-solid"
      class="absolute w-12 h-12 translate-x-5 text-red-800"
    />
    <Icon
      name="map-pin-alt-solid"
      class="absolute w-12 h-12 translate-y-3 text-red-500"
    />
  </div>

  <div class="flex flex-col gap-2">
    <Heading tag="h5" class="text-center">Browse nearby bike racks</Heading>
    <P size="sm" class="text-center">
      As you pan around the map, you'll see the nearest bike racks and their
      details. Narrow your search with search/filter options!
    </P>
  </div>
</div>
