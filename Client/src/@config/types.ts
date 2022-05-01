import Phaser from "phaser";

/** Config settings for game scenes */
export type SceneConfig = {
  baseSceneConfig?: Phaser.Types.Scenes.SettingsConfig;
  screenWidth: number;
  screenHeight: number;
};
