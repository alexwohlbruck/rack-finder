import { createEventDispatcher } from "svelte";
import { writable } from "svelte/store";

const defaultPrefs = {
  theme: "auto",
  language: "auto",
  units: "auto",
  visits: 0,
  onboardingCompleted: false,
  installed: false,
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
