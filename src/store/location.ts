import type { Geolocation } from "../types/Geolocation";

// const initialState: Geolocation = {
//   lat: 50,
//   lng: -81,
//   accuracy: 0,
//   heading: null,
//   speed: null,
//   altitude: null,
//   altitudeAccuracy: null,
//   timestamp: 0,
// };

export enum LocationReducer {
  UPDATE_LOCATION,
}

const reducer = (state, action) => {
  switch (action.type) {
    case LocationReducer.UPDATE_LOCATION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export { reducer as locationReducer };
