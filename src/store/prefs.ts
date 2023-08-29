import { syncedWritable } from "../util";

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

export const prefsStore = syncedWritable("prefs", defaultPrefs);

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
