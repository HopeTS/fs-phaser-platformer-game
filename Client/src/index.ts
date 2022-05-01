////////////////////////////////////////////////////////////////////////////////
// Phaser entry point
////////////////////////////////////////////////////////////////////////////////

import Phaser, { Scene } from "phaser";

import { baseGameConfig } from "@config";
import * as Scenes from "@scenes";

/** All scenes list */
const scenes = [Scenes.InitScene, Scenes.MainMenuScene];

/** Initialize scenes */
const initScenes = () => scenes.map((scene) => new scene());

/** Final game config */
const config: Phaser.Types.Core.GameConfig = {
  ...baseGameConfig,
  scene: initScenes(),
};

new Phaser.Game(config);
