import { createStore } from "../flux";
import racks from "./racks";
import location from "./location";

const store = createStore({
  modules: {
    location,
    racks,
  },
});

export default store;
