import { getState } from "../flux";
import { haversine } from "../util";

export enum RacksMutation {
  ADD_RACK,
}

const initialState = {
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
};

const mutations = {
  ADD_RACK: (state, payload) => {
    state.all.push(payload);
  },
};

const getters = {
  racks: ({ state }) => state.all,
  racksWithLocation: ({ state, rootStore }) => {
    const me = getState(rootStore.location);
    return state.all
      .map((rack) => {
        const distance = haversine(me, rack);
        return { ...rack, distance };
      })
      .sort((a, b) => a.distance - b.distance);
  },
};

export default {
  state: initialState,
  mutations,
  getters,
};
