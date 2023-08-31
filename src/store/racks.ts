import { derived, writable } from "svelte/store";
import { haversine, syncedWritable } from "../util";
import {
  type Rack,
  type RackCoverage,
  type RackType,
  RackCoverages,
} from "../types/rack";
import { mapStore } from "./map";
import { prefsStore } from "./prefs";

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

export const MAX_DISTANCE_METRIC = 10000;
export const MAX_DISTANCE_IMPERIAL = 16093; // 10 mi in meters

const racksStore = syncedWritable<{
  [key: number]: Rack;
}>("racks", {});

const searchOptionsStore = syncedWritable<{
  sort: SortOptions;
  filter: FilterOptions;
  selectedRack: Rack;
}>("searchOptionsStore", {
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

export function addRack(rack: Rack) {
  racksStore.update(($data) => {
    if (!$data[rack.id]) {
      $data[rack.id] = rack;
    }
    return $data;
  });
}

export function addRacks(racks: Rack[]) {
  const racksIdMap = racks.reduce((acc, rack) => {
    acc[rack.id] = rack;
    return acc;
  }, {});
  racksStore.update(($data) => {
    return {
      ...$data,
      ...racksIdMap,
    };
  });
}

export function selectRack(rack) {
  searchOptionsStore.update(($data) => {
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
  searchOptionsStore.update(($data) => {
    $data.sort = sort;
    $data.filter = filter;
    return $data;
  });
}

const racks = derived(
  [racksStore, mapStore, searchOptionsStore, prefsStore],
  ([$racksStore, $mapStore, $searchOptionsStore, $prefsStore]) => {
    return Object.values($racksStore)
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
        } = $searchOptionsStore.filter;
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
        const isMetric = $prefsStore.prefs.units === "metric";
        if (
          distance &&
          maxDistance &&
          maxDistance <
            (isMetric ? MAX_DISTANCE_METRIC : MAX_DISTANCE_IMPERIAL) &&
          distance > maxDistance
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const { by, direction } = $searchOptionsStore.sort;
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
  }
);

export { racksStore, searchOptionsStore, racks };
