<script>
  import { racks } from "../services/overpass";
  import { location } from "../services/geolocation";
  import { A, P, Listgroup } from "flowbite-svelte";
  import { get } from "svelte/store";

  const haversine = (a, b) => {
    const R = 6371e3; // metres
    const φ1 = (a.lat * Math.PI) / 180; // φ, λ in radians
    const φ2 = (b.lat * Math.PI) / 180;
    const Δφ = ((b.lat - a.lat) * Math.PI) / 180;
    const Δλ = ((b.lng - a.lng) * Math.PI) / 180;

    const a1 =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a1), Math.sqrt(1 - a1));

    const d = R * c; // in metres
    return d;
  };

  $: racksWithLocation = $racks
    .map((rack) => {
      const me = get(location);
      const distance = haversine(me, rack);
      return { ...rack, distance };
    })
    .sort((a, b) => a.distance - b.distance);
</script>

<div>
  <P class="text-2xl">Nearby racks</P>

  <hr class="my-4" />

  <Listgroup items={racksWithLocation} let:item>
    <div class="flex items-center">
      <div class="flex-1 flex flex-col">
        <span>{item?.tags.bicycle_parking} style</span>
        <span>{item?.tags.capacity} bike capacity</span>
        <span>{Math.round(item?.distance / 100) / 10} km away</span>
      </div>
      <A>Show</A>
    </div>
  </Listgroup>
</div>
