import { writable } from "svelte/store";
import { type OSMUser } from "../types/OSMUser";

type AuthStore = {
  me: OSMUser | null;
};

export const authStore = writable<AuthStore>({
  me: null,
});

export function setUser(me: OSMUser) {
  authStore.update((store) => {
    return { ...store, me };
  });
}
