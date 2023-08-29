import { syncedWritable } from "../util";

const defaultPrefs: {
  theme: "auto" | "light" | "dark";
  language: "auto" | "en";
  units: "auto" | "metric" | "imperial";
  visits: number;
  onboardingCompleted: boolean;
  installed: boolean;
} = {
  theme: "auto",
  language: "auto",
  units: "auto",
  visits: 0,
  onboardingCompleted: false,
  installed: false,
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
