<script>
  import { racks } from "../services/overpass";
  import { P, Listgroup } from "flowbite-svelte";
</script>

<div>
  <P class="text-2xl">Nearby racks</P>

  <hr class="my-4" />

  <Listgroup items={$racks} let:item>
    {item?.tags.bicycle_parking}
  </Listgroup>
</div>
