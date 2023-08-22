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

<div class="flex gap-3 items-center">
  <A href={profileUrl} target="_blank">
    <Avatar
      src={me?.img.href}
      alt={me?.display_name}
      rounded
      size="md"
      border
      class={`shadow-md ${size === "lg" ? "!w-14 !h-14" : ""}`}
    />
  </A>
  <div class="flex flex-col">
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
        <A color="current" href={changesetsUrl} target="_blank">
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
