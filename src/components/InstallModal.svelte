<script lang="ts">
  import { A, Button, Heading, Modal, P } from "flowbite-svelte";
  import { t } from "../i18n/index";
  export let open;

  import { DownloadSolid } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { deniedInstall, installedPWA, prefsStore } from "../store/prefs";

  let deferredPrompt;

  const showPromptOnVisitCounts = [3, 50, 500];
  const minVisitCount = Math.min(...showPromptOnVisitCounts);

  onMount(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();

      const isInstalled = $prefsStore.installed; // TODO: Not needed?
      const deniedInstall = $prefsStore.deniedInstall;
      const neverAsked = !isInstalled && !deniedInstall;
      const visitCount = $prefsStore.visits;
      const meetsVisitCountThreshold = visitCount >= minVisitCount;
      const isExactlyThreshold = showPromptOnVisitCounts.includes(visitCount);

      if ((meetsVisitCountThreshold && neverAsked) || isExactlyThreshold) {
        deferredPrompt = event;
        open = true;
      }
    });

    window.addEventListener("appinstalled", () => {
      installedPWA();
    });
  });

  function showPrompt() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          open = false;
        }
        if (choiceResult.outcome === "dismissed") {
          open = false;
          deniedInstall();
        }
        deferredPrompt = null;
      });
    }
  }

  function closePrompt() {
    deniedInstall();
    open = false;
  }
</script>

<Modal bind:open outsideclose class="w-400">
  <div class="flex flex-col gap-5">
    <div class="flex flex-col gap-1">
      <Heading tag="h5" class="text-center">
        {$t("installModal.title")}
      </Heading>
      <P size="sm" class="text-center !mt-0">
        {$t("installModal.description")}
      </P>
    </div>

    <!-- TODO: Add app home screen graphic -->

    <div class="flex gap-2 w-full justify-center !mt-0">
      <Button on:click={showPrompt}>
        <DownloadSolid class="w-4 h-4 mr-3" />
        {$t("installModal.install")}
      </Button>

      <Button outline on:click={closePrompt}>
        {$t("installModal.no")}
      </Button>
    </div>
  </div>
</Modal>
