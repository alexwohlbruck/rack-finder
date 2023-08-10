import { derived, writable } from "svelte/store";
import * as Comlink from "comlink";
import type { Rack } from "../types/Rack";
import { mapStore } from "./map";

const racksStore = writable<{
  racks: {
    [key: string]: Rack;
  };
  selectedRack: Rack;
}>({
  racks: {},
  selectedRack: null,
});

export function addRacks(racks: Rack[]) {
  racksStore.update(($data) => {
    const newRacks = racks.filter((rack) => !$data.racks[rack.id]);
    const racksWithIds = newRacks.reduce((acc, rack) => {
      acc[rack.id] = rack;
      return acc;
    }, {});
    $data.racks = { ...$data.racks, ...racksWithIds };
    return $data;
  });
}

// racksStore.update(($data) => {
//   if (!$data.racks[rack.id]) {
//     $data.racks[rack.id] = rack;
//   }
//   return $data;
// });

export function selectRack(rack) {
  racksStore.update(($data) => {
    $data.selectedRack = rack;
    return $data;
  });
}

const racksWorker = Comlink.wrap(
  new Worker(new URL("../workers/racks.worker.ts", import.meta.url), {
    type: "module",
  })
) as any;

// Use derived store with web worker to calculate distance and sort
const racks = derived([racksStore, mapStore], async ([$data, $mapStore]) => {
  const result = await racksWorker.computeDistances(
    Object.values($data.racks),
    $mapStore.center
  );
  return result;
});

export { racksStore, racks };
