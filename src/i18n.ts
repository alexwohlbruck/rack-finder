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
        common: {
          done: "Done",
          chooseOption: "Choose option",
        },
        auth: {
          signIn: "Sign in",
          signOut: "Sign out",
          notSignedIn: "Not signed in",
        },
        nearbyRacksPanel: {
          title: "Nearby racks",
          matchingResults_one: "{{count}} matching result",
          matchingResults_other: "{{count}} matching results",
          sortFilter: "Sort / filter",
        },
        racksList: {
          capacity_one: "{{count}} bicycle",
          capacity_other: "{{count}} bicycles",
          // TODO: Type, rain coverage, traffic, privacy
        },
        rack: {
          attributes: {
            type: "Type",
            capacity: "Capacity",
            private: "Publicity",
            covered: "Rain coverage",
            traffic: "Foot traffic",
            // TODO: Options for each of these attributes
          },
        },
        contributeRackPanel: {
          title: "Contribute new bike rack",
          instruction: "Drag the marker to the location of the rack",
          addToMap: "Add to map",
        },
        searchOptionsModal: {
          sortAndFilter: "Sort and filter",
          sortBy: "Sort by",
          // TODO: sort by options
          hideRackTypes: "Hide rack types",
          // TODO: rack type options
          rainCoverage: "Rain coverage",
          // TODO: rain coverage options
          minCapacity: "Minimum capacity",
          maxDistance: "Maximum distance",
        },
        preferencesModal: {
          contributions_short_one: "{{count}} contribution",
          contributions_short_other: "{{count}} contributions",
          contributions_long_one: "{{count}} OSM contribution",
          contributions_long_other: "{{count}} OSM contributions",
          preferences: "Preferences",
          measurementSystem: "Measurement system",
          // TODO: measurement system options
          language: "Language",
          // TODO: language options
          theme: "Theme (Coming soon)",
          // TODO: theme options
        },
        infoModal: {
          title: "About Rack Finder",
          uses: "Rack Finder uses",
          osm: "OpenStreetMap",
          data: "data to find bicycle parking nearby.",
          free: "This app is 100% free to use and open source. None of your data will be tracked, stored or sold, with the exception of any public contributions you make via your",
          account: "account",
          contributionsOpenSource:
            "These contributions are public and open source, and will be attributed to you licensed under the the",
          license: "ODbL license",
          happyCycling: "Happy cycling! 🚲🚲",
          madeBy: "Made with 💛 by",
        },
      },
    },
    es: {
      translation: {
        common: {
          done: "Hecho",
          chooseOption: "Elegir opción",
        },
        auth: {
          signIn: "Iniciar sesión",
          signOut: "Cerrar sesión",
          notSignedIn: "No has iniciado sesión",
        },
        nearbyRacksPanel: {
          title: "Estacionamientos cercanos",
          matchingResults_one: "{{count}} resultado coincidente",
          matchingResults_other: "{{count}} resultados coincidentes",
          sortFilter: "Ordenar / filtrar",
        },
        racksList: {
          capacity_one: "{{count}} bicicleta",
          capacity_other: "{{count}} bicicletas",
        },
        rack: {
          attributes: {
            type: "Tipo",
            capacity: "Capacidad",
            private: "Publicidad",
            covered: "Cobertura de lluvia",
            traffic: "Tráfico de peatones",
          },
        },
        contributeRackPanel: {
          title: "Contribuir nuevo estacionamiento",
          instruction:
            "Arrastre el marcador a la ubicación del estacionamiento",
          addToMap: "Agregar al mapa",
        },
        searchOptionsModal: {
          sortAndFilter: "Ordenar y filtrar",
          sortBy: "Ordenar por",
          hideRackTypes: "Ocultar tipos de estacionamiento",
          rainCoverage: "Cobertura de lluvia",
          minCapacity: "Capacidad mínima",
          maxDistance: "Distancia máxima",
        },
        preferencesModal: {
          contributions_short_one: "{{count}} contribución",
          contributions_short_other: "{{count}} contribuciones",
          contributions_long_one: "{{count}} contribución de OSM",
          contributions_long_other: "{{count}} contribuciones de OSM",
          preferences: "Preferencias",
          measurementSystem: "Sistema de medición",
          language: "Idioma",
          theme: "Tema (Próximamente)",
        },
        infoModal: {
          title: "Acerca de Rack Finder",
          uses: "Rack Finder usa",
          osm: "OpenStreetMap",
          data: "datos para encontrar estacionamiento para bicicletas cercano.",
          free: "Esta aplicación es 100% gratuita y de código abierto. Ninguno de sus datos será rastreado, almacenado o vendido, con la excepción de cualquier contribución pública que realice a través de su",
          account: "cuenta",
          contributionsOpenSource:
            "Estas contribuciones son públicas y de código abierto, y se le atribuirán con licencia bajo la licencia",
          license: "ODbL",
          happyCycling: "¡Feliz ciclismo! 🚲🚲",
          madeBy: "Hecho con 💛 por",
        },
      },
    },
  },
  interpolation: {
    escapeValue: false, // not needed for svelte as it escapes by default
  },
});

export const i18n = createI18nStore(i18next);

export const t = derived(i18n, ($i18n) => $i18n.t) as any; // TODO: Type this better
