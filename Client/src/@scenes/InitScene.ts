import Phaser from "phaser";

import { DefaultScene } from "@scenes/templates";

/** Initial loading screen */
class InitScene extends Phaser.Scene {
  constructor() {
    super("InitConfig");
  }

  //////////////////////////////////////////////////////////////////////////////
  // BEGIN LIFECYCLE METHODS
  //////////////////////////////////////////////////////////////////////////////

  preload() {
    this.loadMap1();
    this.loadPlayer();
  }

  create() {
    this.scene.start("MainMenuScene");
  }

  update() {}

  //////////////////////////////////////////////////////////////////////////////
  // END LIFECYCLE METHODS
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // BEGIN LOGIC FUNCTIONS
  //////////////////////////////////////////////////////////////////////////////

  /** Load map-1 */
  loadMap1() {
    this.load.tilemapTiledJSON("map-1", "@assets/maps/crystal_world_map.json");
    this.load.image("tiles-1", "@assets/maps/main_lev_build_1.png");
    this.load.image("tiles-2", "@assets/maps/main_lev_build_2.png");
  }

  /** Load player */
  loadPlayer() {
    this.load.image("player", "@assets/player/movements/idle01.png");
    this.load.spritesheet("player", "@assets/player/move_sprite_1.png", {
      frameWidth: 32,
      frameHeight: 38,
      spacing: 32,
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // END LOGIC FUNCTIONS
  //////////////////////////////////////////////////////////////////////////////
}

export default InitScene;
