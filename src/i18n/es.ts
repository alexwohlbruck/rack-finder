export default {
  translation: {
    common: {
      done: "Hecho",
      cancel: "Cancelar",
      edit: "Editar",
      clear: "Limpiar",
      delete: "Eliminar",
      save: "Guardar",
      confirm: "Confirmar",
      yes: "Sí",
      no: "No",
      chooseOption: "Elegir opción",
      bikeRack: "rack para bicicletas",
    },
    onboarding: {
      welcomeStep: {
        title: "Bienvenido a Rack Finder!",
        description:
          "Su compañero gratuito, crowdsourced, sin adornos de estacionamiento para bicicletas.",
      },
      mapInstructionStep: {
        title: "Explore los estacionamientos para bicicletas cercanos",
        description:
          "A medida que se desplaza por el mapa, verá los estacionamientos para bicicletas más cercanos y sus detalles. ¡Ajuste su búsqueda con opciones de búsqueda / filtro!",
      },
      contributeInstructionStep: {
        title: "Contribuir al mapa",
        description:
          "Si encuentra un estacionamiento para bicicletas sin mapear, puede tocar el botón más para contribuir al mapa *.",
        disclaimer:
          "*Cualquier contribución que realice le pertenece a través de su cuenta de OpenStreetMap.",
      },
      locationPermissionStep: {
        title: "Comparte tu ubicación para comenzar",
        description:
          "Sus datos de ubicación no se cargarán ni compartirán con nadie. Se mantiene localmente en su dispositivo.",
        permissionDenied:
          "¡Permiso de ubicación denegado! Verifique la configuración del sitio en su navegador.",
        grant: "Conceder permiso",
        skip: "Saltar",
      },
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
      rainExpected: "¡Se espera lluvia alrededor de {{time}}!",
      now: "ahora",
      narrowSearch: "¿Estrechar su búsqueda solo a bastidores cubiertos?",
      updateFilter: "Actualizar filtro",
    },
    rack: {
      attributes: {
        type: "Tipo",
        capacity: "Capacidad",
        distance: "Distancia",
        access: "Acceso",
        covered: "Cobertura de lluvia",
        traffic: "Tráfico de peatones",
        indoor: "En interiores",
        description: "Descripción",
      },
      type: {
        unknown: "Tipo desconocido",
        stands: "Soportes",
        wave: "Soporte de onda",
        staple: "Soporte de grapa",
        bollard: "Bolardo",
        rack: "Rack",
        loops: "Bucles",
        wall_loops: "Bucles de pared",
        building: "Edificio",
        "two-tier": "Dos niveles",
        wide_stands: "Soportes anchos",
        safe_loops: "Bucles seguros",
        anchors: "Ancla",
        lockers: "Casilleros",
        ground_slots: "Ranuras de tierra",
        informal: "Estacionamiento informal para bicicletas",
        streetpod: "Pod de la calle",
        crossbar: "Barra transversal",
        floor: "Área designada",
        handlebar_holder: "Soporte de manillar",
        tree: "Árbol de bicicletas",
        lean_and_stick: "Apóyese y pegue",
        saddle_holder: "Soporte de sillín",
        arcadia: "Arcadia",
        shed: "Cobertizo de bicicletas",
        rope: "Cuerda",
      },
      capacity_one: "{{count}} bicicleta",
      capacity_other: "{{count}} bicicletas",
      covered: {
        yes: "Cubierto",
        partial: "Parcialmente cubierto",
        no: "Expuesto",
      },
      traffic: {
        none: "Sin tráfico peatonal",
        low: "Tráfico peatonal bajo",
        medium: "Tráfico peatonal medio",
        high: "Tráfico peatonal alto",
      },
      access: {
        private: "Privado",
        yes: "Público",
        permissive: "Acceso permisivo",
        customers: "Solo clientes",
      },
      indoors: {
        yes: "En interiores",
        no: "Al aire libre",
      },
    },
    rackDetail: {
      location: "Cerca de {{location}}",
      navigate: "Navegar",
      attribution: "Contribuido por",
      creator: "Creador de Rack Finder",
    },
    rackForm: {
      addTitle: "Contribuir nuevo estacionamiento",
      editTitle: "Editar estacionamiento",
      instruction: "Arrastre el marcador a la ubicación del estacionamiento",
      addToMap: "Agregar al mapa",
    },
    deleteConfirmationModal: {
      deleteWarning: "Este estacionamiento se eliminará de OpenStreetMap.",
      deleteReviewWarning:
        "Esta característica se marcará para su eliminación. Como no fue el contribuyente original, un miembro de la comunidad de OpenStreetMap revisará su solicitud en breve.",
    },
    searchOptionsModal: {
      sortAndFilter: "Ordenar y filtrar",
      sortBy: "Ordenar por",
      hideRackTypes: "Ocultar tipos de estacionamiento",
      minCapacity: "Capacidad mínima",
      maxDistance: "Distancia máxima",
    },
    preferencesModal: {
      contributions_short_one: "{{count}} contribución",
      contributions_short_other: "{{count}} contribuciones",
      contributions_long_one: "{{count}} contribución de OSM",
      contributions_long_other: "{{count}} contribuciones de OSM",
      preferences: "Preferencias",
      auto: "Automático",
      measurementSystem: "Sistema de medición",
      measurementSystemOptions: {
        metric: "Unidades métricas",
        imperial: "Unidades imperiales",
      },
      language: "Idioma",
      theme: "Tema",
      themeOptions: {
        light: "Claro",
        dark: "Oscuro",
      },
      dangerZone: "Zona de peligro",
      clearCache: "Borrar caché de la aplicación",
      clearCacheDescription:
        "Esto lo desconectará y borrará todos los datos que se hayan almacenado en su dispositivo.",
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
      viewOn: "Ver proyecto en",
    },
    toast: {
      error: "¡Ups! Algo salió mal.",
      contributeConfirmation:
        "¡Gracias! Su contribución aparecerá en el mapa en breve.",
      reviewConfirmation:
        "¡Gracias! Su modificación será revisada por la comunidad.",
      deleteConfirmation:
        "¡Gracias! Esta característica se ha eliminado del mapa.",
    },
  },
};
