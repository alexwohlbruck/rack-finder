// import { haversine } from "../util";

const initialState = {
  all: [],
};

export enum RacksReducer {
  ADD_RACK,
}

const reducer = (state, action) => {
  switch (action.type) {
    case RacksReducer.ADD_RACK:
      return {
        ...state,
        all: [...state.all, action.payload],
      };
    default:
      return state;
  }
};

// const getters = {
//   racks: (state) => state.all,
//   racksWithLocation: (state, getters) => {
//     const me = getters.location;
//     return state.all
//       .map((rack) => {
//         const distance = haversine(me, rack);
//         return { ...rack, distance };
//       })
//       .sort((a, b) => a.distance - b.distance);
//   },
// };

export { reducer as racksReducer, initialState };
