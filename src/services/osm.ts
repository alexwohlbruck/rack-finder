/*
  In this file we will use the osm api to expose OSM endpoints to the client
  We will use the osm-auth library to authenticate the user
  This is 100% client side authentication, no custom server is involved
  The auth token should not be stored in local storage, but in a cookie
  The cookie should be httpOnly and secure
*/

import { osmAuth } from "osm-auth";
import { setUser } from "../store/auth";
import type { BikeRack, Node } from "../types/OSM";
import { js2xml, xml2js } from "xml-js";
import { toggleContributeMode } from "../store/map";
import { showToast } from "../store/toast";
import { APP_URL } from "../globals";

const ATTRIBUTION = "Rack Finder by @alexwohlbruck";
const OSM_BASE_URL = "https://api.openstreetmap.org/api/0.6";
const REDIRECT_PATH = `${window.location.origin}${window.location.pathname}`;
const _declaration = {
  _attributes: {
    version: "1.0",
    encoding: "UTF-8",
  },
};

const osm = osmAuth({
  client_id: "aGe5vYFwWvRLM6--IrLwXVSM_oQ4Q-HN5e9Ow_lrN_w",
  redirect_uri: REDIRECT_PATH,
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

export const logout = () => {
  osm.logout();
  setUser(null);
  toggleContributeMode(false);
};

export const init = async () => {
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

const createChangeset = async (comment, requestReview = false) => {
  const tags = [
    {
      _attributes: {
        k: "created_by",
        v: ATTRIBUTION,
      },
    },
    {
      _attributes: {
        k: "comment",
        v: comment,
      },
    },
    {
      _attributes: {
        k: "locale",
        v: navigator.language, // TODO: Allow user to change language
      },
    },
    {
      _attributes: {
        k: "host",
        v: APP_URL,
      },
    },
  ];

  if (requestReview) {
    tags.push({
      _attributes: {
        k: "review_requested",
        v: "yes",
      },
    });
  }

  const data = {
    _declaration,
    osm: {
      changeset: {
        tag: tags,
      },
    },
  };
  const changesetResponse = await osm.fetch(
    `${OSM_BASE_URL}/changeset/create`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "text/xml",
      },
      body: js2xml(data, { compact: true }),
    }
  );
  const changeset = await changesetResponse.text();
  return changeset as string;
};

const createNode = async ({ changeset, lat, lng, tags }: Node) => {
  const data = {
    _declaration,
    osm: {
      node: {
        _attributes: {
          lat,
          lon: lng,
          version: "1",
          changeset,
        },
        tag: tags.map(({ key, value }) => ({
          _attributes: {
            k: key,
            v: value,
          },
        })),
      },
    },
  };
  const newNodeResponse = await osm.fetch(`${OSM_BASE_URL}/node/create`, {
    method: "PUT",
    headers: {
      "Content-Type": "text/xml",
    },
    body: js2xml(data, { compact: true }),
  });
  const node = await newNodeResponse.text();
  return node as string;
};

const closeChangeset = async (changeset) => {
  const closeChangesetResponse = await osm.fetch(
    `${OSM_BASE_URL}/changeset/${changeset}/close`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "text/xml",
      },
    }
  );
  await closeChangesetResponse.text();
};

export const submitBikeRack = async (bikeRack: BikeRack) => {
  const { lat, lng } = bikeRack;
  const tags = Object.entries(bikeRack.tags)
    .map(([key, value]) => ({
      key,
      value,
    }))
    .filter(({ value }) => value); // Remove empty tags

  try {
    const changeset = await createChangeset(
      `Add ${bikeRack.tags.bicycle_parking} bike rack}`
    );
    await createNode({
      changeset,
      lat,
      lng,
      tags: [
        {
          key: "amenity",
          value: "bicycle_parking",
        },
        ...tags,
      ],
    });
    await closeChangeset(changeset);
    showToast("Thanks! Your contribution will show on the map shortly.");
  } catch (err) {
    console.error(err);
  }
};
