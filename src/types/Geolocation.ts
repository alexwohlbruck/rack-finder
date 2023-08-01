export type Geolocation = {
  lat: number;
  lng: number;
  accuracy?: number;
  heading?: number | null;
  speed?: number | null;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  timestamp?: number;
};
