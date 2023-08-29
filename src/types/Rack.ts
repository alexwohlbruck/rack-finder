export const RackTypes = [
  "stands",
  "wave",
  "staple",
  "bollard",
  "rack",
  "wall_loops",
  "building",
  "two-tier",
  "wide_stands",
  "safe_loops",
  "anchors",
  "lockers",
  "ground_slots",
  "informal",
  "streetpod",
  "crossbar",
  "floor",
  "handlebar_holder",
  "tree",
  "lean_and_stick",
  "saddle_holder",
  "arcadia",
  "shed",
  "rope",
] as const;

export const RackCoverages = ["yes", "no", "partial"] as const;

export type RackType = (typeof RackTypes)[number];
export type RackCoverage = (typeof RackCoverages)[number];

// https://wiki.openstreetmap.org/wiki/Key:bicycle_parking

type Covered = "yes" | "no" | "partial";

export type BikeRackTags = {
  bicycle_parking: RackType;
  capacity?: number;
  covered?: Covered;
};

export type Rack = {
  id?: number;
  lat: number;
  lng: number;
  tags: {
    amenity?: string;
    bicycle_parking?: RackType;
    capacity?: string;
    covered?: RackCoverage;
    fee?: string;
    lit?: string;
    operator?: string;
    source?: string;
  };
};
