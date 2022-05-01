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
    const layers = this.createLayers(map);

    const player = this.createPlayer();
    this.physics.add.collider(player, layers.platformColliders);
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
    const player = this.physics.add.sprite(100, 250, "player");
    player.body.setGravityY(500);
    player.setCollideWorldBounds(true);

    return player;
  }

  //////////////////////////////////////////////////////////////////////////////
  // END LOGIC FUNCTIONS
  //////////////////////////////////////////////////////////////////////////////
}

export default PlayScene;
