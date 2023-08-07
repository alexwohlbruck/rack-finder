import { derived, writable } from "svelte/store";
import { haversine } from "../util";
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

export function addRack(rack) {
  racksStore.update(($data) => {
    if (!$data.racks[rack.id]) {
      $data.racks[rack.id] = rack;
    }
    return $data;
  });
}

export function selectRack(rack) {
  racksStore.update(($data) => {
    $data.selectedRack = rack;
    return $data;
  });
}

const racks = derived([racksStore, mapStore], ([$data, $mapStore]) => {
  return Object.values($data.racks)
    .map((rack) => {
      const distance = haversine($mapStore.center, rack);
      return { ...rack, distance };
    })
    .sort((a, b) => a.distance - b.distance);
});

export { racksStore, racks };
