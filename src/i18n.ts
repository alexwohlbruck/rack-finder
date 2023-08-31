import i18next from "i18next";
import { createI18nStore } from "svelte-i18next";
import { derived } from "svelte/store";
import { getLocalStorage } from "./localStorage";

i18next.init({
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
            distance: "Distance",
            capacity: "Capacity",
            private: "Publicity",
            covered: "Rain coverage",
            traffic: "Foot traffic",
            // TODO: Options for each of these attributes
          },
          type: {
            stands: "Stands",
            wave: "Wave rack",
            staple: "Staple rack",
            bollard: "Bollard",
            rack: "Rack",
            wall_loops: "Wall loops",
            building: "Building",
            "two-tier": "Two tier",
            wide_stands: "Wide stands",
            safe_loops: "Safe loops",
            anchors: "Anchor",
            lockers: "Lockers",
            ground_slots: "Ground slots",
            informal: "Informal bike parking",
            streetpod: "Street pod",
            crossbar: "Crossbar",
            floor: "Designated area",
            handlebar_holder: "Handlebar holder",
            tree: "Bike tree",
            lean_and_stick: "Lean and stick",
            saddle_holder: "Saddle holder",
            arcadia: "Arcadia",
            shed: "Bike shed",
            rope: "Rope",
          },
          covered: {
            yes: "Covered",
            partial: "Partially covered",
            no: "Exposed",
          },
          traffic: {
            none: "No foot traffic",
            low: "Low foot traffic",
            medium: "Medium foot traffic",
            high: "High foot traffic",
          },
          private: {
            yes: "Private",
            no: "Public",
            permissive: "Permissive access",
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
          hideRackTypes: "Hide rack types",
          rainCoverage: "Rain coverage",
          minCapacity: "Minimum capacity",
          maxDistance: "Maximum distance",
        },
        preferencesModal: {
          contributions_short_one: "{{count}} contribution",
          contributions_short_other: "{{count}} contributions",
          contributions_long_one: "{{count}} OSM contribution",
          contributions_long_other: "{{count}} OSM contributions",
          preferences: "Preferences",
          auto: "Automatic",
          measurementSystem: "Measurement system",
          measurementSystemOptions: {
            metric: "Metric units",
            imperial: "Imperial units",
          },
          language: "Language",
          theme: "Theme (Coming soon)",
          themeOptions: {
            light: "Light",
            dark: "Dark",
          },
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
    fr: {
      translation: {
        common: {
          done: "Terminé",
          chooseOption: "Choisissez une option",
        },
        auth: {
          signIn: "Se connecter",
          signOut: "Se déconnecter",
          notSignedIn: "Non connecté",
        },
        nearbyRacksPanel: {
          title: "Racks à proximité",
          matchingResults_one: "{{count}} résultat correspondant",
          matchingResults_other: "{{count}} résultats correspondants",
          sortFilter: "Trier / filtrer",
        },
        racksList: {
          capacity_one: "{{count}} vélo",
          capacity_other: "{{count}} vélos",
        },
        rack: {
          attributes: {
            type: "Type",
            capacity: "Capacité",
            private: "Publicité",
            covered: "Couverture de pluie",
            traffic: "Trafic piétonnier",
          },
        },
        contributeRackPanel: {
          title: "Contribuer à un nouveau rack à vélos",
          instruction: "Faites glisser le marqueur à l'emplacement du rack",
          addToMap: "Ajouter à la carte",
        },
        searchOptionsModal: {
          sortAndFilter: "Trier et filtrer",
          sortBy: "Trier par",
          hideRackTypes: "Masquer les types de racks",
          rainCoverage: "Couverture de pluie",
          minCapacity: "Capacité minimale",
          maxDistance: "Distance maximale",
        },
        preferencesModal: {
          contributions_short_one: "{{count}} contribution",
          contributions_short_other: "{{count}} contributions",
          contributions_long_one: "{{count}} contribution OSM",
          contributions_long_other: "{{count}} contributions OSM",
          preferences: "Préférences",
          measurementSystem: "Système de mesure",
          language: "Langue",
          theme: "Thème (Prochainement)",
        },
        infoModal: {
          title: "À propos de Rack Finder",
          uses: "Rack Finder utilise",
          osm: "OpenStreetMap",
          data: "données pour trouver un stationnement pour vélos à proximité.",
          free: "Cette application est 100% gratuite et open source. Aucune de vos données ne sera suivie, stockée ou vendue, à l'exception de toute contribution publique que vous ferez via votre",
          account: "compte",
          contributionsOpenSource:
            "Ces contributions sont publiques et open source, et vous seront attribuées sous licence",
          license: "ODbL",
          happyCycling: "Bon vélo! 🚲🚲",
          madeBy: "Fait avec 💛 par",
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
