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
    rack: {
      attributes: {
        type: "Type",
        capacity: "Capacité",
        distance: "Distance",
        acces: "Accès",
        covered: "Couverture de pluie",
        traffic: "Trafic piétonnier",
      },
      type: {
        stands: "Supports",
        wave: "Support d'onde",
        staple: "Support de base",
        bollard: "Borne",
        rack: "Rack",
        wall_loops: "Boucles murales",
        building: "Bâtiment",
        "two-tier": "Deux niveaux",
        wide_stands: "Supports larges",
        safe_loops: "Boucles de sécurité",
        anchors: "Ancre",
        lockers: "Casiers",
        ground_slots: "Fentes au sol",
        informal: "Stationnement de vélo informel",
        streetpod: "Pod de rue",
        crossbar: "Barre transversale",
        floor: "Zone désignée",
        handlebar_holder: "Support de guidon",
        tree: "Arbre à vélos",
        lean_and_stick: "Appuyez-vous et collez",
        saddle_holder: "Support de selle",
        arcadia: "Arcadia",
        shed: "Abri à vélos",
        rope: "Corde",
      },
      capacity_one: "{{count}} vélo",
      capacity_other: "{{count}} vélos",
      covered: {
        yes: "Couvert",
        partial: "Partiellement couvert",
        no: "Exposé",
      },
      traffic: {
        none: "Pas de trafic piétonnier",
        low: "Faible trafic piétonnier",
        medium: "Trafic piétonnier moyen",
        high: "Trafic piétonnier élevé",
      },
      access: {
        private: "Privé",
        yes: "Public",
        permissive: "Accès permissif",
        customers: "Clients seulement",
      },
    },
    rackDetail: {
      location: "Près de {{location}}",
      edit: "Modifier",
      delete: "Supprimer",
      navigate: "Naviguer",
      attribution: "Contribué par",
      creator: "Créateur de Rack Finder",
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
      auto: "Automatique",
      measurementSystem: "Système de mesure",
      measurementSystemOptions: {
        metric: "Unités métriques",
        imperial: "Unités impériales",
      },
      language: "Langue",
      theme: "Thème (Prochainement)",
      themeOptions: {
        light: "Clair",
        dark: "Sombre",
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
