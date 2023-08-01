import { updateLocation } from "../store/location";

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
    const payload = {
      lat: latitude,
      lng: longitude,
      accuracy,
      heading,
      speed,
      altitude,
      altitudeAccuracy,
      timestamp,
    };
    updateLocation(payload);
  });
};

export const stopWatchingLocation = () => {
  if (locationWatcher) {
    navigator.geolocation.clearWatch(locationWatcher);
  }
};
