<script>
  import { Heading, P } from "flowbite-svelte";
  import Button from "../../lib/Button.svelte";

  let stickerLimit = 50; // TODO: Move to globals
</script>

<div class="flex flex-col gap-2">
  <Heading tag="h5" class="text-center">
    You've contributed over {stickerLimit} bike racks!
  </Heading>
  <P size="sm" class="text-center">
    Your fellow cyclists thank you! To show our appreciation, we'll send you
    some free stickers.
  </P>
  <div class="flex justify-center">
    <!-- TODO: advance step -->
    <Button>Continue</Button>
  </div>
</div>
