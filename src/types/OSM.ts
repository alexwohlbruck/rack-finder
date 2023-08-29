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
