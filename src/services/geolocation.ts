// Create an store that will be used to emit the location

import { writable } from "svelte/store";

// TODO: Remove this in favor of location store in src/store/location.ts
export const locationStore = writable<any>({});

export type LocationPermissionStatus = "granted" | "denied" | "prompt";

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

export async function getLocationPermissionStatus(): Promise<LocationPermissionStatus> {
  if (!navigator.permissions) {
    return new Promise((resolve, reject) => {
      resolve("prompt");
    });
  }
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
