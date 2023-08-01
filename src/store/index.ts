import { writable, derived } from "svelte/store";
import { racksReducer, initialState as racksInitialState } from "./racks";
import {
  locationReducer,
  initialState as locationInitialState,
} from "./location";

const rootReducer = (state, action) => ({
  racks: racksReducer(state.racks, action),
  location: locationReducer(state.location, action),
});

const createRootStore = () => {
  const { subscribe, update } = writable({
    racks: racksInitialState,
    location: locationInitialState,
  });

  const dispatch = (action) => update((state) => rootReducer(state, action));

  return { subscribe, dispatch };
};

const store = createRootStore();

export default store;
