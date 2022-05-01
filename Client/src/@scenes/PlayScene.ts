import { DefaultScene } from "@scenes/templates";

/** Template for scenes ;) */
class PlayScene extends DefaultScene {
  constructor() {
    super("PlayScene");
  }

  //////////////////////////////////////////////////////////////////////////////
  // BEGIN LIFECYCLE METHODS
  //////////////////////////////////////////////////////////////////////////////

  preload() {
    super.preload();
  }

  create() {
    super.create();

    const map = this.createMap();
    const { environment, platforms } = this.createLayers(map);
  }

  update() {
    super.update();
  }

  //////////////////////////////////////////////////////////////////////////////
  // END LIFECYCLE METHODS
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // BEGIN LOGIC FUNCTIONS
  //////////////////////////////////////////////////////////////////////////////

  /** Create / configure map */
  createMap() {
    const map = this.make.tilemap({ key: "map-1" });
    map.addTilesetImage("main_lev_build_1", "tiles-1");
    map.addTilesetImage("main_lev_build_2", "tiles-2");

    return map;
  }

  /** Create layers */
  createLayers(map: Phaser.Tilemaps.Tilemap) {
    const tileset = map.getTileset("main_lev_build_1");
    const environment = map.createLayer("environment", tileset);
    const platforms = map.createLayer("platforms", tileset);
    return { environment, platforms };
  }

  //////////////////////////////////////////////////////////////////////////////
  // END LOGIC FUNCTIONS
  //////////////////////////////////////////////////////////////////////////////
}

export default PlayScene;
