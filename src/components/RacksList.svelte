<script>
  import { racks } from "../store";
  import { P, Listgroup } from "flowbite-svelte";
</script>

<div>
  <P class="text-2xl">Nearby racks</P>

  <hr class="my-4" />

  <Listgroup items={$racks} let:item class="w-48">
    {item?.tags.bicycle_parking}
  </Listgroup>
</div>
