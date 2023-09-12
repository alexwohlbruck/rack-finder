export default {
  translation: {
    common: {
      done: "Terminé",
      chooseOption: "Choisissez une option",
    },
    onboarding: {
      welcomeStep: {
        title: "Bienvenue sur Rack Finder!",
        description:
          "Votre compagnon de stationnement pour vélos gratuit, crowdsourcé et sans fioritures.",
      },
      mapInstructionStep: {
        title: "Parcourez les supports à vélos à proximité",
        description:
          "En parcourant la carte, vous verrez les supports à vélos les plus proches et leurs détails. Affinez votre recherche avec les options de recherche / filtre!",
      },
      contributeInstructionStep: {
        title: "Contribuer à la carte",
        description:
          "Si vous trouvez un support à vélos non cartographié, vous pouvez appuyer sur le bouton plus pour le contribuer à la carte *.",
        disclaimer:
          "*Toute contribution que vous apportez vous appartient via votre compte OpenStreetMap.",
      },
      locationPermissionStep: {
        title: "Partagez votre position pour commencer",
        description:
          "Vos données de localisation ne seront pas téléchargées ni partagées avec qui que ce soit. Il est conservé localement sur votre appareil.",
        permissionDenied:
          "Autorisation de localisation refusée! Vérifiez les paramètres du site dans votre navigateur.",
        grant: "Accorder l'autorisation",
        skip: "Sauter",
      },
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
        unknown: "Type inconnu",
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
      viewOn: "Voir le projet sur",
    },
    toast: {
      contributeConfirmation:
        "Merci! Votre contribution apparaîtra sur la carte sous peu.",
    },
  },
};
