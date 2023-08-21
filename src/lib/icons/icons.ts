const iconNames = ["stands", "wave", "rack", "bollard"] as const;
export type IconName = (typeof iconNames)[number];

// These have to be imported manually because of use of vite-plugin-svelte-svg
import standsComponent from "./stands.svg?c";
import waveComponent from "./wave.svg?c";
import rackComponent from "./rack.svg?c";
import bollardComponent from "./bollard.svg?c";

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
} = {};
(async () => {
  for (const iconName of iconNames) {
    /* @vite-ignore */
    const svgModule = await import(`./${iconName}.svg`);
    svgs[iconName] = svgModule.default;
  }
})();

export const asComponent = components;
export const asSvg = svgs;
