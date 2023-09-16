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

// TODO: Separate into payload and response types
export type OSMNode = {
  id?: number;
  lat?: number;
  lon?: number;
  lng?: number;
  version?: number;
  changeset?: string;
  center?: {
    lat: number;
    long: number;
  };
  timestamp?: string;
  uid?: number;
  user?: string;
  type: "node" | "way" | "relation";
  tags: {
    [key: string]: string;
  };
};
