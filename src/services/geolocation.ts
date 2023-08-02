// Create an store that will be used to emit the location

import { writable } from "svelte/store";

export const locationStore = writable<any>({});

export async function getCurrentLocation() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      (location) => {
        locationStore.set(location);
        resolve(location);
      },
      reject,
      {
        enableHighAccuracy: true,
      }
    )
  );
}

export async function getLocationPermissionStatus() {
  return new Promise((resolve, reject) =>
    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        resolve(result.state);
      })
      .catch((error) => {
        reject(error);
      })
  );
}
