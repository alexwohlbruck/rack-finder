export default {
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
        distance: "", // TODO:
        private: "Publicidad",
        covered: "Cobertura de lluvia",
        traffic: "Tráfico de peatones",
      },
      // TODO: all these
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
      title: "Contribuir nuevo estacionamiento",
      instruction: "Arrastre el marcador a la ubicación del estacionamiento",
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
      auto: "Automatic", // TODO:
      measurementSystem: "Sistema de medición",
      // TODO:
      measurementSystemOptions: {
        metric: "",
        imperial: "",
      },
      language: "Idioma",
      theme: "Tema (Próximamente)",
      // TODO:
      themeOptions: {
        light: "",
        dark: "",
      },
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
};
