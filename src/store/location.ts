import type { Geolocation } from "../types/Geolocation";

export enum LocationAction {
  UPDATE_LOCATION,
}

const initialState: Geolocation = {
  lat: 35.2271,
  lng: -80.8431,
  accuracy: 0,
  heading: null,
  speed: null,
};

const mutations = {
  UPDATE_LOCATION: (state, payload) => {
    Object.assign(state, payload);
  },
};

export default {
  state: initialState,
  mutations,
};
