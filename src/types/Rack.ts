export type Rack = {
  id: number;
  lat: number;
  lng: number;
  distance?: number;
  tags: {
    amenity?: string;
    bicycle_parking?: string;
    capacity?: string;
    covered?: string;
    fee?: string;
    lit?: string;
    operator?: string;
    source?: string;
  };
};
