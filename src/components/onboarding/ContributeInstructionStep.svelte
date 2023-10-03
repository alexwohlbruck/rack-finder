<script>
  import { Heading, P } from "flowbite-svelte";
  import Button from "../../lib/Button.svelte";
  import { t } from "../../i18n";
  import { PlusSolid } from "flowbite-svelte-icons";
</script>

<div class="flex flex-col gap-5 items-center">
  <Button class="!p-5 bg-primary-400" rounded shadow size="xl">
    <PlusSolid class="w-4 h-4 text-gray-800 outline-none" />
  </Button>

  <div class="flex flex-col gap-2">
    <Heading tag="h5" class="text-center">
      {$t("onboarding.contributeInstructionStep.title")}
    </Heading>
    <P size="sm" class="text-center">
      {$t("onboarding.contributeInstructionStep.description")}
    </P>
  </div>

  <P size="xs" weight="semibold" class="text-center opacity-70">
    {$t("onboarding.contributeInstructionStep.disclaimer")}
  </P>
</div>
