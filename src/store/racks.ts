import { derived, writable } from "svelte/store";
import { haversine } from "../util";
import {
  RackTypes,
  type Rack,
  type RackCoverage,
  type RackType,
  RackCoverages,
} from "../types/Rack";
import { mapStore } from "./map";

export type SortOptions = {
  by: "distance" | "capacity";
  direction: "asc" | "desc";
};

export type FilterOptions = {
  ignoreType: RackType[];
  covered: RackCoverage[];
  minCapacity: number;
  maxDistance: number;
};

const racksStore = writable<{
  racks: {
    [key: string]: Rack;
  };
  sort: SortOptions;
  filter: FilterOptions;
  selectedRack: Rack;
}>({
  racks: {},
  selectedRack: null,
  sort: {
    by: "distance",
    direction: "asc",
  },
  filter: {
    ignoreType: [],
    covered: [...RackCoverages],
    minCapacity: 1,
    maxDistance: 1000,
  },
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

export function setOptions({
  sort,
  filter,
}: {
  sort: SortOptions;
  filter: FilterOptions;
}) {
  racksStore.update(($data) => {
    $data.sort = sort;
    $data.filter = filter;
    return $data;
  });
}

const racks = derived([racksStore, mapStore], ([$data, $mapStore]) => {
  return Object.values($data.racks)
    .map((rack) => {
      const distance = haversine($mapStore.center, rack);
      return { ...rack, distance };
    })
    .filter((rack) => {
      const {
        ignoreType,
        covered: coveredSelection,
        minCapacity,
        maxDistance,
      } = $data.filter;
      const capacity = parseInt(rack.tags?.capacity, null);
      const { distance } = rack;

      const { bicycle_parking: type, covered } = rack.tags;

      if (ignoreType && ignoreType.length && ignoreType.includes(type)) {
        return false;
      }
      if (
        covered &&
        coveredSelection.length &&
        !coveredSelection.includes(covered)
      ) {
        return false;
      }
      if (capacity && minCapacity && capacity < minCapacity) {
        return false;
      }
      if (
        distance &&
        maxDistance &&
        maxDistance < 10000 &&
        distance > maxDistance
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const { by, direction } = $data.sort;
      if (by === "distance") {
        if (direction === "asc") {
          return a.distance - b.distance;
        }
        return b.distance - a.distance;
      }
      if (by === "capacity") {
        const aCapacity = parseInt(a.tags?.capacity, null) || 0;
        const bCapacity = parseInt(b.tags?.capacity, null) || 0;
        if (direction === "asc") {
          return aCapacity - bCapacity;
        }
        return bCapacity - aCapacity;
      }
    });
});

export { racksStore, racks };
