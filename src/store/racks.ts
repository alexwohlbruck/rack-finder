import { derived, writable } from "svelte/store";
import { haversine } from "../util";
import { locationStore } from "./location";
import type { Rack } from "../types/Rack";

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

const racks = derived([racksStore, locationStore], ([$data, $location]) => {
  return Object.values($data.racks)
    .map((rack) => {
      const distance = haversine($location, rack);
      return { ...rack, distance };
    })
    .sort((a, b) => a.distance - b.distance);
});

export { racksStore, racks };
