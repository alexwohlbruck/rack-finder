<script>
  import { Heading, P } from "flowbite-svelte";
  import AppLogo from "../AppLogo.svelte";
  import { t } from "../../i18n";
</script>

<div class="flex flex-col gap-3 items-center">
  <AppLogo class="mb-3" size="lg" />
  <div class="flex flex-col gap-2">
    <Heading tag="h4" class="text-center">
      {$t("onboarding.welcomeStep.title")}
    </Heading>
    <P size="sm" class="text-center">
      {$t("onboarding.welcomeStep.description")}
    </P>
  </div>
</div>
