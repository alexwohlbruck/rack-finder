import Racks from "./components/NearbyRacksPanel.svelte";
import RackForm from "./components/RackForm.svelte";
import RackDetail from "./components/RackDetail.svelte";

export const routes = {
  "/": Racks,
  "/contribute": RackForm,
  "/racks/:id": RackDetail,
};
