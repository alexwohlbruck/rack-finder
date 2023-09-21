import { push } from "svelte-spa-router";
import { logout } from "./services/osm";

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key) || "{}");
};

export const incrementVisits = () => {
  // This is called on page load track the number of visits to the site
};

export const clearLocalStorageAndRefresh = () => {
  localStorage.clear();
  logout();
  push("/");
  window.location.reload();
};
