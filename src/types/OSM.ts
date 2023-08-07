export type OSMUser = {
  id: number;
  display_name: string;
  account_created: string;
  description?: string;
  contributor_terms?: {
    agreed: boolean;
    pd: boolean;
  };
  img?: {
    href: string;
  };
  roles: any[];
  changesets: {
    count: number;
  };
  traces: {
    count: number;
  };
  blocks: {
    received: {
      count: number;
      active: number;
    };
  };
  languages: string[];
  messages: {
    received: {
      count: number;
      unread: number;
    };
    sent: {
      count: number;
    };
  };
};

export type Node = {
  changeset: string;
  lat: number;
  lng: number;
  tags: {
    key: string;
    value: any;
  }[];
};

// https://wiki.openstreetmap.org/wiki/Key:bicycle_parking
type RackType =
  | "stands"
  | "wall_loops"
  | "safe_loops"
  | "rack"
  | "anchors"
  | "shed"
  | "bollard"
  | "lockers"
  | "wide_stands"
  | "ground_slots"
  | "building"
  | "informal"
  | "streetpod"
  | "tree"
  | "crossbar"
  | "rope"
  | "two-tier"
  | "floor"
  | "handlebar_holder"
  | "lean_and_stick"
  | "wave"
  | "saddle_holder"
  | string;

type Covered = "yes" | "no" | "partial";

export type BikeRackTags = {
  bicycle_parking: RackType;
  capacity?: number;
  covered?: Covered;
};

export type BikeRack = {
  lat: number;
  lng: number;
  tags: BikeRackTags;
};
