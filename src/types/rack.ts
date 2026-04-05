import type { OSMNode } from "./osm";

export const RackTypes = [
  "stands",
  "wave",
  "staple",
  "bollard",
  "rack",
  "wall_loops",
  "two-tier",
  "building",
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
export type RackAccess = "yes" | "private" | "permissive";
export type RackIndoor = "yes" | "no";

// https://wiki.openstreetmap.org/wiki/Key:bicycle_parking

export type RackTags = {
  bicycle_parking?: RackType;
  capacity?: number;
  covered?: RackCoverage;
  access?: RackAccess;
  indoor?: RackIndoor;
  description?: string;
};

export type Rack = OSMNode & {
  tags: RackTags & {
    amenity?: string;
    fee?: string;
    lit?: string;
    operator?: string;
    source?: string;
    [key: string]: any;
  };
};
