export type Position = {
  lat: number;
  lng: number;
};

export type Geolocation = Position & {
  accuracy?: number;
  heading?: number | null;
  speed?: number | null;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  timestamp?: number;
};
