import "./app.postcss";
import App from "./App.svelte";
import { handleAuthPopupLanding, init } from "./services/osm";
import { incrementVisits } from "./store/prefs";

// If this is the OSM login popup returning, hand the result to the main
// window before anything else runs
handleAuthPopupLanding();

const app = new App({
  target: document.getElementById("app"),
});

// Start OSM authentication initialization
init();
incrementVisits();

export default app;
