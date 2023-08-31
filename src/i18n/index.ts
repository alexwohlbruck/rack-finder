import i18next from "i18next";
import { createI18nStore } from "svelte-i18next";
import { derived } from "svelte/store";

import en from "./en";
import es from "./es";
import fr from "./fr";

i18next.init({
  fallbackLng: "en",
  resources: { en, es, fr },
  interpolation: {
    escapeValue: false, // not needed for svelte as it escapes by default
  },
});

export const i18n = createI18nStore(i18next);

export const t = derived(i18n, ($i18n) => $i18n.t) as any; // TODO: Type this better
