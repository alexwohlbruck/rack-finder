/*
  In this file we will use the osm api to expose OSM endpoints to the client
  We will use the osm-auth library to authenticate the user
  This is 100% client side authentication, no custom server is involved
  The auth token should not be stored in local storage, but in a cookie
  The cookie should be httpOnly and secure
*/

import { osmAuth } from "osm-auth";
import { setUser } from "../store/auth";

const redirectPath = `${window.location.origin}${window.location.pathname}`;

console.log({ redirectPath });

const osm = osmAuth({
  client_id: "aGe5vYFwWvRLM6--IrLwXVSM_oQ4Q-HN5e9Ow_lrN_w",
  redirect_uri: redirectPath,
  scope: "write_api read_prefs",
  auto: true,
});

export const checkAuthenticated = () => {
  return osm.authenticated();
};

export const authenticate = async () => {
  try {
    await osm.authenticateAsync();
    await getOsmUser();
  } catch (err) {
    console.error(err);
  }
};

export const getOsmUser = async () => {
  try {
    const response = await osm.fetch(
      `https://api.openstreetmap.org/api/0.6/user/details.json`
    );
    const { user } = await response.json();
    setUser(user);
  } catch (err) {
    console.error(err);
  }
};

const init = async () => {
  // Return auth token to parent window when authentication is complete
  if (window.opener) {
    window.opener.authComplete(window.location.href);
    window.close();
  }

  // If the user is authenticated, get the user details
  if (checkAuthenticated()) {
    getOsmUser();
  }
};

init();
