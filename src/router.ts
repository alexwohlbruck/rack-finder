import Racks from "./components/NearbyRacksPanel.svelte";
import ContributeRackPanel from "./components/ContributeRackPanel.svelte";
import RackDetail from "./components/RackDetail.svelte";

export const routes = {
  "/": Racks,
  "/contribute": ContributeRackPanel,
  "/racks/:id": RackDetail,
};
