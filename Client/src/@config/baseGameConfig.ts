import Phaser from "phaser";

import { baseConfig } from "@config";

/** Basic Phaser.Game config options */
const baseGameConfig: Phaser.Types.Core.GameConfig = {
  width: baseConfig.screenWidth,
  height: baseConfig.screenHeight,
  type: Phaser.AUTO,
  pixelArt: true,
  physics: {
    default: "arcade",
  },
};

export default baseGameConfig;
