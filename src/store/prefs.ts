import { derived } from "svelte/store";
import { syncedWritable } from "../util";

export type Units = "metric" | "imperial";
type UnitsOption = "auto" | Units;
type ThemeOption = "auto" | "light" | "dark";
type LanguageOption = "auto" | "en-US";

export type Preferences = {
  theme: ThemeOption;
  language: LanguageOption;
  units: UnitsOption;
};

const defaultPrefs: {
  prefs: Preferences;
  visits: number;
  onboardingCompleted: boolean;
  installed: boolean;
} = {
  prefs: {
    theme: "auto",
    language: "en-US",
    units: "auto",
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
    const imperialCountries = ["US"]; // TODO: Find the other countries that use imperial
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
