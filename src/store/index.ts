import { createStore } from "../flux";
import { haversine } from "../util";

const locationStore = {
  state: {
    lat: 50,
    lng: -81,
    accuracy: 0,
    heading: null,
    speed: null,
  },
  mutations: {
    UPDATE_LOCATION: (state, payload) => {
      Object.assign(state, payload);
    },
  },
};

const racksStore = {
  state: {
    all: [
      {
        id: 1,
        lat: 35.2271,
        lng: -80.8431,
        name: "Rack 1",
        tags: {
          bicycle_parking: "stands",
          capacity: 2,
        },
      },
    ],
  },
  mutations: {
    ADD_RACK: (state, payload) => {
      state.all.push(payload);
    },
  },
  getters: {
    racks: (state) => state.all,
    racksWithLocation: (state, getters) => {
      // const me = state.location;
      const me = {
        lat: 35.2271,
        lng: -80.8431,
      };
      return state.all
        .map((rack) => {
          const distance = haversine(me, rack);
          return { ...rack, distance };
        })
        .sort((a, b) => a.distance - b.distance);
    },
  },
};

const store = createStore({
  modules: {
    location: locationStore,
    racks: racksStore,
  },
});

export default store;
