// TODO: Import these dynamically
import standsIcon from "./stands.svg";
import standsMultiIcon from "./stands_multi.svg";
import waveIcon from "./wave.svg";
import rackIcon from "./rack.svg";
import bollardIcon from "./bollard.svg";
import stapleIcon from "./staple.svg";
import anchorsIcon from "./anchors.svg";

import StandsComponent from "./stands.svg?c";
import StandsMultiComponent from "./stands_multi.svg?c";
import WaveComponent from "./wave.svg?c";
import RackComponent from "./rack.svg?c";
import BollardComponent from "./bollard.svg?c";
import StapleComponent from "./staple.svg?c";
import AnchorsComponent from "./anchors.svg?c";

// TODO: Get these from rack types def
const iconNames = [
  "stands",
  "stands_multi",
  "wave",
  "rack",
  "bollard",
  "staple",
  "anchors",
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
  anchors: AnchorsComponent,
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
  anchors: anchorsIcon,
};

export const asComponent = components;
export const asSvg = svgs;
