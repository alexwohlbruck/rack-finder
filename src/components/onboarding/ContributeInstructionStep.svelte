<script>
  import { Heading, P } from "flowbite-svelte";
  import Button from "../../lib/Button.svelte";
  import { Icon } from "flowbite-svelte-icons";
</script>

<div class="flex flex-col gap-5 items-center">
  <Button class="!p-5 bg-primary-400" rounded shadow size="xl">
    <Icon name="plus-solid" class="w-4 h-4 text-gray-800" />
  </Button>

  <div class="flex flex-col gap-2">
    <Heading tag="h5" class="text-center">Contribute to the map</Heading>
    <P size="sm" class="text-center">
      If you find an unmapped bike rack, you can tap the plus button to
      contribute it to the map*.
    </P>
  </div>

  <P size="xs" weight="semibold" class="text-center opacity-70">
    *Any contributions you make are owned by you via your OpenStreetMap account.
  </P>
</div>
