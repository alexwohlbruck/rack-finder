<script lang="ts">
  import { Heading, Modal, P, Button, Spinner } from "flowbite-svelte";
  import { t } from "../i18n";
  import { authStore } from "../store/auth";
  import { deleteBikeRack } from "../services/osm";
  import { push } from "svelte-spa-router";

  export let open = true;
  export let rack;
  let loading = false;

  $: me = $authStore.me;
  $: isMyRack = rack?.user === me?.display_name;

  async function deleteRack() {
    loading = true;
    await deleteBikeRack(rack, !isMyRack);
    loading = false;
    open = false;
    push("/");
  }
</script>

<Modal bind:open size="xs" outsideclose>
  <Heading tag="h5">
    Delete {rack?.tags.bicycle_parking
      ? $t(`rack.type.${rack.tags.bicycle_parking}`)
      : "bike rack"}?
  </Heading>
  <P size="sm" class="!mt-2">
    {#if isMyRack}
      This rack will be deleted from OpenStreetMap.
    {:else}
      This rack will be marked for deletion. Since you weren't the original
      contributor, a member of the OpenStreetMap community will review your
      request shortly.
    {/if}
  </P>
  <div class="flex gap-2 justify-end">
    <Button outline on:click={() => (open = false)}>Cancel</Button>
    <Button color="red" on:click={deleteRack}>
      {#if loading}
        <Spinner class="mr-3" size="5" color="white" />
      {/if}
      Delete
    </Button>
  </div>
</Modal>
