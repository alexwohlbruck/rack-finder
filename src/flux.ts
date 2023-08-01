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
  readable,
  derived,
  readonly,
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
};

type StoreInstance = {
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
  [key: string]: any; // TODO: Figure out how to type this as StoreInstance
};

const createStore = ({
  state,
  getters,
  mutations,
  actions,
  modules,
}: Store) => {
  const rootStore: StoreInstance = {
    state: writable(state || {}),
    getters: {},
    mutations,
    actions,
  };

  if (getters) {
    Object.entries(getters).forEach(([key, getter]) => {
      rootStore.getters[key] = derived(rootStore.state, ($state) =>
        getter($state, rootStore.getters)
      );
    });
  }

  const commit = (name: string, payload?: any) => {
    const $state = get(rootStore.state);
    rootStore.mutations[name]($state, payload);
    rootStore.state.set($state);
  };

  const dispatch = (name: string, payload?: any) => {
    const context = {
      state: get(rootStore.state),
      commit,
      dispatch,
    };
    rootStore.actions[name](context, payload);
  };

  if (modules) {
    Object.entries(modules).forEach(([key, module]) => {
      rootStore[key] = createStore(module);
    });
  }

  return rootStore;
};

const getState = (store: StoreInstance) => {
  return get(store.state);
};

export { createStore, getState };
