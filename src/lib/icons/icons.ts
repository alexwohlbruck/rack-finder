// TODO: Import these dynamically
import standsIcon from "./stands.svg";
import standsMultiIcon from "./stands_multi.svg";
import waveIcon from "./wave.svg";
import rackIcon from "./rack.svg";
import bollardIcon from "./bollard.svg";
import stapleIcon from "./staple.svg";
import wallLoopsIcon from "./wall_loops.svg";
import twoTierIcon from "./two_tier.svg";
import anchorsIcon from "./anchors.svg";
import buildingIcon from "./building.svg";
import wideStandsIcon from "./wide_stands.svg";
import safeLoopsIcon from "./safe_loops.svg";
import informalIcon from "./informal.svg";
import lockersIcon from "./lockers.svg";
import shedIcon from "./shed.svg";

import StandsComponent from "./stands.svg?c";
import StandsMultiComponent from "./stands_multi.svg?c";
import WaveComponent from "./wave.svg?c";
import RackComponent from "./rack.svg?c";
import BollardComponent from "./bollard.svg?c";
import StapleComponent from "./staple.svg?c";
import WallLoopsComponent from "./wall_loops.svg?c";
import TwoTierComponent from "./two_tier.svg?c";
import AnchorsComponent from "./anchors.svg?c";
import buildingComponent from "./building.svg?c";
import WideStandsComponent from "./wide_stands.svg?c";
import SafeLoopsComponent from "./safe_loops.svg?c";
import InformalComponent from "./informal.svg?c";
import LockersComponent from "./lockers.svg?c";
import ShedComponent from "./shed.svg?c";

// TODO: Get these from rack types def
const iconNames = [
  "stands",
  "stands_multi",
  "wave",
  "rack",
  "bollard",
  "staple",
  "wall_loops",
  "two-tier",
  "anchors",
  "building",
  "wide_stands",
  "safe_loops",
  "informal",
  "lockers",
  "shed",
] as const;
export type IconName = (typeof iconNames)[number];

const components: {
  [key in IconName]: any;
} = {
  stands: StandsComponent,
  stands_multi: StandsMultiComponent,
  wave: WaveComponent,
  rack: RackComponent,
  bollard: BollardComponent,
  staple: StapleComponent,
  wall_loops: WallLoopsComponent,
  "two-tier": TwoTierComponent,
  anchors: AnchorsComponent,
  building: buildingComponent,
  wide_stands: WideStandsComponent,
  safe_loops: SafeLoopsComponent,
  informal: InformalComponent,
  lockers: LockersComponent,
  shed: ShedComponent,
};

const svgs: {
  [key in IconName]: any;
} = {
  stands: standsIcon,
  stands_multi: standsMultiIcon,
  wave: waveIcon,
  rack: rackIcon,
  bollard: bollardIcon,
  staple: stapleIcon,
  wall_loops: wallLoopsIcon,
  "two-tier": twoTierIcon,
  anchors: anchorsIcon,
  building: buildingIcon,
  wide_stands: wideStandsIcon,
  safe_loops: safeLoopsIcon,
  informal: informalIcon,
  lockers: lockersIcon,
  shed: shedIcon,
};

export const asComponent = components;
export const asSvg = svgs;
