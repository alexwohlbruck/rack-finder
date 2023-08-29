import { createEventDispatcher } from "svelte";
import { writable } from "svelte/store";

const defaultPrefs: {
  theme: "auto" | "light" | "dark";
  language: "auto" | "en";
  units: "auto" | "metric" | "imperial";
  visits: number;
  onboardingCompleted: boolean;
  installed: boolean;
  lastLocation: {
    lat: number;
    lng: number;
    zoom: number;
  };
} = {
  theme: "auto",
  language: "auto",
  units: "auto",
  visits: 0,
  onboardingCompleted: false,
  installed: false,
  lastLocation: {
    lat: 0,
    lng: 0,
    zoom: 0,
  },
};

const storedPrefs = JSON.parse(localStorage.getItem("prefs") || "{}");

export const prefsStore = writable({
  ...defaultPrefs,
  ...storedPrefs,
});

prefsStore.subscribe((value) => {
  localStorage.setItem("prefs", JSON.stringify(value));
});

export const incrementVisits = () => {
  prefsStore.update(($data) => {
    $data.visits++;
    return $data;
  });
};

export const completeOnboarding = () => {
  prefsStore.update(($data) => {
    $data.onboardingCompleted = true;
    return $data;
  });
};

export const setLastLocation = (lat: number, lng: number, zoom: number) => {
  prefsStore.update(($data) => {
    $data.lastLocation = { lat, lng, zoom };
    return $data;
  });
};
