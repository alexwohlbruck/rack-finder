import { getState } from "../flux";
import { haversine } from "../util";

export enum RacksMutation {
  AddRack = "ADD_RACK",
}

const initialState = {
  all: [],
};

const mutations = {
  [RacksMutation.AddRack]: (state, payload) => {
    state.all = [...state.all, payload];
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
