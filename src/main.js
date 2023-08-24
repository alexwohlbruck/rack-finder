import "./app.postcss";
import App from "./App.svelte";
import { init } from "./services/osm";
import { incrementVisits } from "./store/prefs";

const app = new App({
  target: document.getElementById("app"),
});

// Start OSM authentication initialization
init();
incrementVisits();

export default app;
