export default {
  translation: {
    common: {
      done: "Done",
      cancel: "Cancel",
      edit: "Edit",
      clear: "Clear",
      delete: "Delete",
      save: "Save",
      confirm: "Confirm",
      yes: "Yes",
      no: "No",
      chooseOption: "Choose option",
      bikeRack: "bike rack",
    },
    onboarding: {
      welcomeStep: {
        title: "Welcome to Rack Finder!",
        description:
          "Your free, crowdsourced, no-frills bicycle parking companion.",
      },
      mapInstructionStep: {
        title: "Browse nearby bike racks",
        description:
          "As you pan around the map, you'll see the nearest bike racks and their details. Narrow your search with search/filter options!",
      },
      contributeInstructionStep: {
        title: "Contribute to the map",
        description:
          "If you find an unmapped bike rack, you can tap the plus button to contribute it to the map*.",
        disclaimer:
          "*Any contributions you make are owned by you via your OpenStreetMap account.",
      },
      locationPermissionStep: {
        title: "Share your location to get started",
        description:
          "Your location data will not be uploaded or shared with anyone. It is kept locally on your device.",
        permissionDenied:
          "Location permission denied! Check the site settings in your browser.",
        grant: "Grant permission",
        skip: "Skip",
      },
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
      rainExpected: "Rain expected around {{time}}!",
      now: "now",
      narrowSearch: "Narrow your search to only covered racks?",
      updateFilter: "Update filter",
    },
    rack: {
      attributes: {
        type: "Type",
        capacity: "Capacity",
        distance: "Distance",
        access: "Access",
        covered: "Rain coverage",
        traffic: "Foot traffic",
        indoor: "Indoors",
        description: "Description",
      },
      type: {
        unknown: "Unknown type",
        stands: "Stands",
        wave: "Wave rack",
        staple: "Staple rack",
        bollard: "Bollard",
        rack: "Rack",
        wall_loops: "Wall loops",
        loops: "Loops",
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
      capacity_one: "{{count}} bicycle",
      capacity_other: "{{count}} bicycles",
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
      access: {
        private: "Private",
        yes: "Public",
        permissive: "Permissive access",
        customers: "Customers only",
      },
      indoor: {
        yes: "Indoors",
        no: "Outdoors",
      },
    },
    rackDetail: {
      location: "Near {{location}}",
      navigate: "Navigate",
      attribution: "Contributed by",
      creator: "Creator of Rack Finder",
    },
    rackForm: {
      addTitle: "Contribute new bike rack",
      editTitle: "Edit bike rack", // TODO: Add type variable
      instruction: "Drag the marker to the location of the rack",
      addToMap: "Add to map",
    },
    deleteConfirmationModal: {
      deleteWarning: "This rack will be deleted from OpenStreetMap.",
      deleteReviewWarning:
        "This rack will be marked for deletion. Since you weren't the original contributor, a member of the OpenStreetMap community will review your request shortly.",
    },
    searchOptionsModal: {
      sortAndFilter: "Sort and filter",
      sortBy: "Sort by",
      hideRackTypes: "Hide rack types",
      indoorOnly: "Indoors only",
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
      theme: "Theme",
      themeOptions: {
        light: "Light",
        dark: "Dark",
      },
      dangerZone: "Danger zone",
      clearCache: "Clear application cache",
      clearCacheDescription:
        "This will sign you out and clear all data that has been cached on your device.",
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
      viewOn: "View project on",
    },
    toast: {
      error: "Oops! Something went wrong.",
      contributeConfirmation:
        "Thanks! Your contribution will is now live on the map!.",
      reviewConfirmation:
        "Thanks! Your edit will be reviewed by the community.",
      deleteConfirmation: "Thanks! This feature has been removed from the map.",
    },
  },
};
