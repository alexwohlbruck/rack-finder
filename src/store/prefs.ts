import { derived } from "svelte/store";
import { syncedWritable } from "../util";

export type Units = "metric" | "imperial";
export type UnitsOption = "auto" | Units;
export type ThemeOption = "auto" | "light" | "dark";
export type LanguageOption = "auto" | "en-US";

export type Preferences = {
  theme: ThemeOption;
  language: LanguageOption;
  units: UnitsOption;
  animationSpeedMs?: number;
  locateOnOpen?: boolean;
  autoSatellite?: boolean;
  buildings3d?: boolean;
};

const defaultPrefs: {
  prefs: Preferences;
  visits: number;
  onboardingCompleted: boolean;
  installed: boolean;
} = {
  prefs: {
    theme: "auto",
    language: "auto",
    units: "auto",
    animationSpeedMs: 500,
    locateOnOpen: true,
    autoSatellite: true,
    buildings3d: true,
  },
  visits: 0,
  onboardingCompleted: false,
  installed: false,
};

export const prefsStore = syncedWritable("prefs", defaultPrefs);

export const preferredUnits = derived([prefsStore], ([$data]) => {
  const value = $data?.prefs?.units;
  if (value === "auto") {
    const country = navigator.language.split("-")[1];
    const imperialCountries = ["US", "LR", "MM"];
    if (imperialCountries.includes(country)) return "imperial";
    return "metric";
  }
  return value;
});

export const setPrefs = (prefs: Preferences) => {
  prefsStore.update(($data) => {
    return {
      ...$data,
      prefs,
    };
  });
};

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
