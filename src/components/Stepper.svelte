<script lang="ts">
  import { Button, Indicator } from "flowbite-svelte";
  import {
    CheckCircleOutline,
    CheckCircleSolid,
    ChevronLeftOutline,
    ChevronRightOutline,
  } from "flowbite-svelte-icons";

  export let steps: any[] = [];

  let currentStep = 0;
  $: indicators = steps.map((step, i) => {
    return {
      completed: i < currentStep,
    };
  });

  $: canNext = currentStep < steps.length - 1;
  $: canPrev = currentStep > 0;

  function next() {
    if (canNext) {
      currentStep++;
    }
  }

  function prev() {
    if (canPrev) {
      currentStep--;
    }
  }
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center">
    <div class:invisible={!canPrev}>
      <Button on:click={prev} color="none" size="xs">
        <ChevronLeftOutline size="sm" class="text-gray-500" />
      </Button>
    </div>

    <div class="flex-1 mx-2">
      {#each steps as component, i}
        {#if i === currentStep}
          <svelte:component this={component} />
        {/if}
      {/each}
    </div>

    <div class:invisible={!canNext}>
      <Button on:click={next} color="none" size="xs">
        <ChevronRightOutline size="sm" class="text-gray-500" />
      </Button>
    </div>
  </div>

  <div class="flex items-center gap-2 px-2">
    {#each indicators as indicator, i}
      <Indicator size="xl" color="none">
        {#if indicator.completed}
          <CheckCircleSolid class="text-emerald-500" />
        {:else}
          <CheckCircleOutline
            class={i === currentStep ? "text-primary-500" : "text-gray-500"}
          />
        {/if}
      </Indicator>
      {#if i !== indicators.length - 1}
        <div class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
      {/if}
    {/each}
  </div>
</div>
