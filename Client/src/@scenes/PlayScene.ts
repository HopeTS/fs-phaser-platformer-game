import Phaser from "phaser";

import { DefaultScene } from "@scenes/templates";
import { Player } from "@entities";

/** Template for scenes ;) */
export class PlayScene extends DefaultScene {
  /** Basic controls */
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  /** Player move speed */
  private playerMoveSpeed: number;

  /** Map layers */
  private layers: {
    environment: Phaser.Tilemaps.TilemapLayer;
    platforms: Phaser.Tilemaps.TilemapLayer;
    platformColliders: Phaser.Tilemaps.TilemapLayer;
  };

  /** Player */
  private player: Player;

  constructor() {
    super("PlayScene");

    this.playerMoveSpeed = 200;
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
    this.layers = this.createLayers(map);

    this.player = this.createPlayer();

    this.physics.add.collider(this.player, this.layers.platformColliders);

    this.cursors = this.input.keyboard.createCursorKeys();
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

    // Collision layers
    const platformColliders = map.createLayer("platform_colliders", tileset);
    platformColliders.setCollisionByProperty({ collides: true });

    // Static layers
    const environment = map.createLayer("environment", tileset);
    const platforms = map.createLayer("platforms", tileset);

    return { environment, platforms, platformColliders };
  }

  /** Create player */
  createPlayer() {
    return new Player(this, 100, 250);
  }

  //////////////////////////////////////////////////////////////////////////////
  // END LOGIC FUNCTIONS
  //////////////////////////////////////////////////////////////////////////////
}

export default PlayScene;
