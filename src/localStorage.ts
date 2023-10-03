import { push } from "svelte-spa-router";
import { logout } from "./services/osm";

export const getLocalStorage = (key: string, fallback: any = null) => {
  return JSON.parse(localStorage.getItem(key) || fallback);
};

export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const incrementVisits = () => {
  // This is called on page load track the number of visits to the site
};

export const clearLocalStorageAndRefresh = () => {
  push("/");
  localStorage.clear();
  logout();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};
