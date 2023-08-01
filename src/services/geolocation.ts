import { writable } from "svelte/store";

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

export const location = writable<Geolocation>({
  lat: 0,
  lng: 0,
  accuracy: 0,
  heading: null,
  speed: null,
  altitude: null,
  altitudeAccuracy: null,
  timestamp: 0,
});

let locationWatcher;

export const watchLocation = async () => {
  if (!navigator.geolocation) {
    return;
  }

  locationWatcher = navigator.geolocation.watchPosition((position) => {
    const {
      latitude,
      longitude,
      accuracy,
      heading,
      speed,
      altitude,
      altitudeAccuracy,
    } = position.coords;
    const { timestamp } = position;
    location.set({
      lat: latitude,
      lng: longitude,
      accuracy,
      heading,
      speed,
      altitude,
      altitudeAccuracy,
      timestamp,
    });
  });
};

export const stopWatchingLocation = () => {
  if (locationWatcher) {
    navigator.geolocation.clearWatch(locationWatcher);
  }
};
