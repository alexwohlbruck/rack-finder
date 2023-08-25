<script>
  import { Alert, DropdownDivider, Heading, P } from "flowbite-svelte";
  import Button from "../../lib/Button.svelte";
</script>

<div class="flex flex-col gap-5 items-center">
  <Button class="!p-5 bg-primary-400" rounded shadow size="xl">
    <svg
      class="icon w-4 h-4 text-gray-800"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 18"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2.5"
        d="M9 1v16M1 9h16"
      />
    </svg>
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
    <DropdownDivider class="my-3" />
    Note: This isn't working on Safari/iPhone right now. Bare with me. 🥲
  </P>
</div>
