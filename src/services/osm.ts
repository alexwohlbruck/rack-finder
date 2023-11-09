/*
  In this file we will use the osm api to expose OSM endpoints to the client
  We will use the osm-auth library to authenticate the user
  This is 100% client side authentication, no custom server is involved
  The auth token should not be stored in local storage, but in a cookie
  The cookie should be httpOnly and secure
*/

import { osmAuth } from "osm-auth";
import { setUser } from "../store/auth";
import type { OSMNode } from "../types/osm";
import { js2xml, xml2js } from "xml-js";
import { showToast } from "../store/toast";
import { APP_URL } from "../globals";
import { addRack, removeRack } from "../store/racks";
import type { Rack } from "../types/rack";
import i18next from "i18next";
import { push } from "svelte-spa-router";
import config from "../config";

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isIOS =
  (/iPad|iPhone|iPod/.test(navigator.platform) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
  !window.MSStream;
const useSinglePageAuth = isSafari || isIOS;

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
  client_id: config.osmClientId,
  redirect_uri: REDIRECT_PATH,
  scope: "write_api read_prefs",
  auto: true,
  singlepage: useSinglePageAuth,
  locale: "fr",
});

let me = null;

export const checkAuthenticated = () => {
  return osm.authenticated();
};

export const authenticate = async () => {
  try {
    await osm.authenticateAsync();
    await getOsmUser();
  } catch (err) {
    console.error(err);
    showToast(i18next.t("toast.error"), "error");
  }
};

export const logout = () => {
  osm.logout();
  setUser(null);
  me = null;
  push("/");
};

export const init = async () => {
  // Single page auth method, check code and authenticate
  if (
    useSinglePageAuth &&
    window.location.search
      .slice(1)
      .split("&")
      .some((p) => p.startsWith("code="))
  ) {
    await authenticate();
  }

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
    me = user;
  } catch (err) {
    console.error(err);
    showToast(i18next.t("toast.error"), "error");
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

const createNode = async ({ changeset, lat, lng, tags }: Partial<OSMNode>) => {
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
        tag: Object.entries(tags).map(([key, value]) => ({
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

const editNode = async ({ changeset, id, version, lat, lng, tags }) => {
  const data = {
    _declaration,
    osm: {
      node: {
        _attributes: {
          id,
          visible: "true",
          version,
          changeset,
          lat,
          lon: lng,
        },
        tag: Object.entries(tags).map(([key, value]) => ({
          _attributes: {
            k: key,
            v: value,
          },
        })),
      },
    },
  };
  const editNodeResponse = await osm.fetch(`${OSM_BASE_URL}/node/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "text/xml",
    },
    body: js2xml(data, { compact: true }),
  });
  return await editNodeResponse.text();
};

// Delete OSM node by its ID
const deleteNode = async (
  changeset: string,
  { id, version, lat, lng }: Partial<OSMNode>
) => {
  const data = {
    _declaration,
    osm: {
      node: {
        _attributes: {
          id,
          version,
          changeset,
          lat,
          lon: lng,
        },
      },
    },
  };
  const deletedNodeResponse = await osm.fetch(`${OSM_BASE_URL}/node/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "text/xml",
    },
    body: js2xml(data, { compact: true }),
  });
  return await deletedNodeResponse.text();
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

const dictToKVList = (dict) => {
  return Object.entries(dict)
    .map(([key, value]) => ({
      key,
      value,
    }))
    .filter(({ value }) => value); // Remove empty tags
};

export const addBikeRack = async (rack: Partial<Rack>) => {
  const { lat, lng } = rack;
  const tags = dictToKVList(rack.tags);

  try {
    const changeset = await createChangeset(
      `Add ${rack.tags.bicycle_parking} bike rack`
    );
    const rackId = parseInt(
      await createNode({
        changeset,
        lat,
        lng,
        tags: {
          amenity: "bicycle_parking",
          ...tags.reduce((acc, { key, value }) => {
            acc[key] = value;
            return acc;
          }, {}),
        },
      })
    );
    await closeChangeset(changeset);
    const result = await getBikeRack(rackId, "node");
    addRack(result);
    showToast(i18next.t("toast.contributeConfirmation"));
  } catch (err) {
    console.error(err);
    showToast(i18next.t("toast.error"), "error");
  }
};

export const getBikeRack = async (id: number, type: "node") => {
  try {
    // include center point for ways
    const response = await osm.fetch(
      `${OSM_BASE_URL}/${type}/${id}.json?center=true`
    );

    const { elements } = await response.json();
    const element = elements[0];
    let { lat, lon: lng } = element;

    return {
      ...element,
      lat,
      lng,
    };
  } catch (err) {
    console.error(err);
    showToast(i18next.t("toast.error"), "error");
  }
};

export const editBikeRack = async (
  rack: Partial<Rack>,
  requestReview = true
) => {
  const { id, version, lat, lng } = rack;
  const tags = dictToKVList(rack.tags);

  try {
    const changeset = await createChangeset(`Edit bike rack`, requestReview);

    const newVersion = await editNode({
      changeset,
      id,
      version,
      lat,
      lng,
      tags: {
        ...tags.reduce((acc, { key, value }) => {
          acc[key] = value;
          return acc;
        }, {}),
      },
    });

    await closeChangeset(changeset);
    const result = await getBikeRack(id, "node");
    addRack(result, true);
    showToast(i18next.t("toast.reviewConfirmation"));
  } catch (err) {
    console.error(err);
    showToast(i18next.t("toast.error"), "error");
  }
};

export const deleteBikeRack = async (rack: Rack, requestReview = true) => {
  try {
    const changeset = await createChangeset(`Remove bike rack`, requestReview);
    await deleteNode(changeset, rack);
    await closeChangeset(changeset);
    if (!requestReview) {
      removeRack(rack.id);
    }
    showToast(
      i18next.t(
        requestReview ? "toast.reviewConfirmation" : "toast.deleteConfirmation"
      )
    );
  } catch (err) {
    console.error(err);
    showToast(i18next.t("toast.error"), "error");
  }
};
