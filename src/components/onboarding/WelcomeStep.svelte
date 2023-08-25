<script>
  import { Heading, P } from "flowbite-svelte";
  import AppLogo from "../AppLogo.svelte";
</script>

<div class="flex flex-col gap-3 items-center">
  <AppLogo class="mb-3" size="lg" />
  <div class="flex flex-col gap-2">
    <Heading tag="h4" class="text-center">Welcome to Rack Finder!</Heading>
    <P size="sm" class="text-center">
      Your free, crowdsourced, no-frills bicycle parking companion.
    </P>
  </div>
</div>
