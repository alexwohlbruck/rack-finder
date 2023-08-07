import "./app.postcss";
import App from "./App.svelte";
import { init } from "./services/osm";

const app = new App({
  target: document.getElementById("app"),
});

// Start OSM authentication initialization
init();

export default app;
