<script lang="ts">
  import { A, Avatar, P } from "flowbite-svelte";
  import type { OSMUser } from "../types/osm";
  import { t } from "../i18n/index";
  import { osmProfileUrl } from "../util";

  export let me: OSMUser;
  export let size: any = "sm";

  let profileUrl, changesetsUrl;

  $: profileUrl = me ? osmProfileUrl(me.display_name) : null;

  // TODO: Move to common util
  $: changesetsUrl = me ? `${profileUrl}/history` : null;
</script>

<div class="flex-1 flex gap-3 items-center">
  <Avatar
    src={me?.img?.href}
    alt={me?.display_name}
    rounded
    border
    class={`avatar shadow-md ${
      size === "lg" ? "!w-14 !h-14 !min-w-fit" : "!w-10 !h-10 !min-w-fit"
    }`}
  />
  <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
    <P {size} weight="medium">
      {#if me}
        <A color="current" href={profileUrl} target="_blank">
          {me?.display_name}
        </A>
      {:else}
        {$t("auth.notSignedIn")}
      {/if}
    </P>
    {#if me}
      <P size={size === "lg" ? "sm" : "xs"}>
        <A
          color="current"
          href={changesetsUrl}
          target="_blank"
          class="text-ellipsis whitespace-nowrap"
        >
          {$t("preferencesModal.contributions", {
            count: me?.changesets.count,
            context: size === "lg" ? "long" : "short",
          })}
        </A>
      </P>
    {/if}
  </div>
</div>

<style>
  :global(.avatar) {
    aspect-ratio: 1;
  }
</style>
