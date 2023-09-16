import Racks from "./components/NearbyRacksPanel.svelte";
import RackForm from "./components/RackForm.svelte";
import RackDetail from "./components/RackDetail.svelte";

export const routes = {
  "/": Racks,
  "/racks/add": RackForm,
  "/racks/:id/edit": RackForm,
  "/racks/:id": RackDetail,
};
