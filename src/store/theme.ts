import { writable, derived } from "svelte/store";
import { prefsStore } from "./prefs";

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const media = writable(mediaQuery.matches);

mediaQuery.addEventListener("change", (e) => {
  media.set(e.matches);
});

export default derived([media, prefsStore], ([$media, $prefsStore]) => {
  const themePref = $prefsStore.prefs.theme;
  if (themePref === "auto") {
    return $media;
  } else {
    return themePref === "dark";
  }
});
