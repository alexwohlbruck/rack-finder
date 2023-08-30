import i18next from "i18next";
import { createI18nStore } from "svelte-i18next";
import { derived } from "svelte/store";
import LanguageDetector from "i18next-browser-languagedetector";

i18next.use(LanguageDetector).init({
  detection: {
    order: ["querystring", "localStorage", "navigator"],
    caches: ["localStorage"],
    lookupQuerystring: "lng",
    lookupLocalStorage: "locale",
  },
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        nearbyRacks: "Nearby racks",
        matchingResults_one: "{{count}} matching result",
        matchingResults_other: "{{count}} matching results",
      },
    },
    es: {
      translation: {
        nearbyRacks: "Estacionamientos cercanos",
        matchingResults_one: "{{count}} resultado coincidente",
        matchingResults_other: "{{count}} resultados coincidentes",
      },
    },
  },
  interpolation: {
    escapeValue: false, // not needed for svelte as it escapes by default
  },
});

export const i18n = createI18nStore(i18next);

export const t = derived(i18n, ($i18n) => $i18n.t) as any; // TODO: Type this better
