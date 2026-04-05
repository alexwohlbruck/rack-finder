import { derived } from "svelte/store";
import { haversine, syncedWritable } from "../util";
import {
  type Rack,
  type RackCoverage,
  type RackType,
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
  indoorOnly: boolean;
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
    covered: [],
    indoorOnly: false,
    minCapacity: 1,
    maxDistance: 1000,
  },
});

// TODO: Make force update false and expire racks after some time period
export function addRack(rack: Rack, forceUpdate = true) {
  racksStore.update(($data) => {
    if (forceUpdate || !$data[rack.id]) {
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

export function removeRack(rackId: number) {
  racksStore.update(($data) => {
    delete $data[rackId];
    return $data;
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

// TODO: Create a robust filter/sort system
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
          indoorOnly,
          minCapacity,
          maxDistance,
        } = $searchOptionsStore.filter;
        const capacity = parseInt(rack.tags?.capacity, null);
        const { distance } = rack;

        const {
          bicycle_parking: type,
          covered,
          indoor,
        } = rack.tags;

        // Hide types
        if (ignoreType && ignoreType?.length && ignoreType.includes(type)) {
          return false;
        }
        // Rain coverage
        if (
          (!covered && coveredSelection?.length) ||
          (coveredSelection?.length && !coveredSelection.includes(covered))
        ) {
          return false;
        }
        // Indoors only
        if (indoorOnly && indoor !== "yes") {
          return false;
        }
        // Min capacity
        if (capacity && minCapacity && capacity < minCapacity) {
          return false;
        }
        // Max distance
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
