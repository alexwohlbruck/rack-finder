<script>
  import { Heading, P } from "flowbite-svelte";
  import { MapPinAltSolid } from "flowbite-svelte-icons";
  import { t } from "../../i18n";
</script>

<div class="flex flex-col gap-5 items-center">
  <div class="relative w-14 h-14">
    <MapPinAltSolid class="absolute w-12 h-12 translate-x-5 text-red-800" />
    <MapPinAltSolid class="absolute w-12 h-12 translate-y-3 text-red-500" />
  </div>

  <div class="flex flex-col gap-2">
    <Heading tag="h5" class="text-center">
      {$t("onboarding.mapInstructionStep.title")}
    </Heading>
    <P size="sm" class="text-center">
      {$t("onboarding.mapInstructionStep.description")}
    </P>
  </div>
</div>
