/**
 * Flux implementation with Svelte stores
 * - Allows modules for each entity
 * - Initial states with typings
 * - Mutations to update state
 * - Computed getters
 * - Dispatchable actions
 */
import {
  writable,
  derived,
  get,
  type Writable,
  type Readable,
} from "svelte/store";

type Getter = (state: any, getters?: any) => any;

type Mutation = (state: any, payload?: any) => void;

type Action = (context: any, payload?: any) => void;

type Store = {
  state?: any;
  getters?: {
    [key: string]: Getter;
  };
  mutations?: {
    [key: string]: Mutation;
  };
  actions?: {
    [key: string]: Action;
  };
  modules?: {
    [key: string]: Store;
  };
  parentModule?: StoreInstance;
};

interface StoreInstance {
  state: Writable<any>;
  getters?: {
    [key: string]: Readable<any>;
  };
  mutations?: {
    [key: string]: Mutation;
  };
  actions?: {
    [key: string]: Action;
  };
  // Modules
  parentModule?: StoreInstance;
  [key: string]: any; // TODO: Figure out how to type this as StoreInstance
}

// Return the top-level store
const getRootStore = (store: StoreInstance): StoreInstance => {
  if (store.parentModule) {
    return getRootStore(store.parentModule);
  }
  return store;
};

const createStore = ({
  state,
  getters,
  mutations,
  actions,
  modules,
  parentModule,
}: Store) => {
  const store: StoreInstance = {
    state: writable(state || {}),
    getters: {},
    mutations,
    actions,
    parentModule,
  };

  if (getters) {
    Object.entries(getters).forEach(([key, getter]) => {
      store.getters[key] = derived(store.state, ($state) => {
        const rootStore = getRootStore(store);
        return getter({
          state: $state,
          getters: store.getters,
          rootStore,
        });
      });
    });
  }

  const commit = (name: string, payload?: any) => {
    const $state = get(store.state);
    store.mutations[name]($state, payload);
    store.state.set($state);
  };

  const dispatch = (name: string, payload?: any) => {
    const context = {
      state: get(store.state),
      commit,
      dispatch,
    };
    store.actions[name](context, payload);
  };

  if (modules) {
    Object.entries(modules).forEach(([key, module]) => {
      store[key] = createStore({
        ...module,
        parentModule: store,
      });
    });
  }

  return store;
};

const getState = (store: StoreInstance) => {
  return get(store.state);
};

export { createStore, getState, getRootStore };
