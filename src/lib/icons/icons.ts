// TODO: Import these dynamically
import standsIcon from "./stands.svg";
import waveIcon from "./wave.svg";
import rackIcon from "./rack.svg";
import bollardIcon from "./bollard.svg";

import standsComponent from "./stands.svg?c";
import waveComponent from "./wave.svg?c";
import rackComponent from "./rack.svg?c";
import bollardComponent from "./bollard.svg?c";

const iconNames = ["stands", "wave", "rack", "bollard"] as const;
export type IconName = (typeof iconNames)[number];

const components: {
  [key in IconName]: any;
} = {
  stands: standsComponent,
  wave: waveComponent,
  rack: rackComponent,
  bollard: bollardComponent,
};

const svgs: {
  [key in IconName]: any;
} = {
  stands: standsIcon,
  wave: waveIcon,
  rack: rackIcon,
  bollard: bollardIcon,
};

export const asComponent = components;
export const asSvg = svgs;
