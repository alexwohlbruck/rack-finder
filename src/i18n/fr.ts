export default {
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
        distance: "", // TODO:
        private: "Publicité",
        covered: "Couverture de pluie",
        traffic: "Trafic piétonnier",
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
      auto: "Automatic", // TODO:
      measurementSystem: "Système de mesure",
      // TODO:
      measurementSystemOptions: {
        metric: "",
        imperial: "",
      },
      language: "Langue",
      theme: "Thème (Prochainement)",
      // TODO:
      themeOptions: {
        light: "",
        dark: "",
      },
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
};
