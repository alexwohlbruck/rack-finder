<script lang="ts">
  import { A, Avatar, P } from "flowbite-svelte";
  import type { OSMUser } from "../types/OSM";

  export let me: OSMUser;
  export let size: any = "sm";

  let profileUrl, changesetsUrl;

  $: profileUrl = me
    ? `https://www.openstreetmap.org/user/${me.display_name}`
    : null;

  $: changesetsUrl = me ? `${profileUrl}/history` : null;
</script>

<div class="flex-1 flex gap-3 items-center">
  <Avatar
    src={me?.img.href}
    alt={me?.display_name}
    rounded
    border
    class={`shadow-md ${
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
        Not signed in
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
          {me?.changesets.count}
          {#if size === "lg"}
            OpenStreetMap
          {/if}
          contribution{me?.changesets.count !== 1 ? "s" : ""}
        </A>
      </P>
    {/if}
  </div>
</div>
