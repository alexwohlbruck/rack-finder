<script>
  import { A, P, Listgroup, ListgroupItem } from "flowbite-svelte";
  import { racks } from "../store/racks";
</script>

<div>
  <P class="text-2xl mb-4 font-bold">Nearby racks</P>

  <Listgroup>
    {#each $racks as rack}
      <ListgroupItem>
        <div class="flex items-center">
          <div class="flex-1 flex flex-col">
            <span>{rack?.tags.bicycle_parking} style</span>
            <span>{rack?.tags.capacity} bike capacity</span>
            <span>{Math.round(rack?.distance / 100) / 10} km away</span>
          </div>
          <A>Show</A>
        </div>
      </ListgroupItem>
    {/each}
  </Listgroup>
</div>
