import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
  body: Phaser.Physics.Arcade.Body;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  /** Gravity strength */
  public gravity: number;

  /** Movement speed */
  public moveSpeed: number;

  /** Strength of player's jump */
  public jumpStrength: number;

  constructor(scene: Phaser.Scene, x: number, y: number, frame?) {
    super(scene, x, y, "player", frame && frame);

    // Connect entity to game / IO
    this.scene = scene;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // Configure custom player attributes
    this.gravity = 500;
    this.moveSpeed = 200;
    this.jumpStrength = 180;

    this.init();
    this.setEventListeners();
  }

  //////////////////////////////////////////////////////////////////////////////
  // BEGIN LIFECYCLE METHODS
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // END LIFECYCLE METHODS
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // BEGIN ENTITY LOGIC FUNCTIONS
  //////////////////////////////////////////////////////////////////////////////

  /** Handle player controls */
  executeInputControls() {
    const { left, right, space, up } = this.cursors;

    // Left arrow key
    if (left.isDown) {
      this.setVelocityX(-this.moveSpeed);
    }

    // Right arrow key
    else if (right.isDown) {
      this.setVelocityX(this.moveSpeed);
    }

    // Spacebar
    else if (space.isDown || up.isDown) {
      this.setVelocityY(-this.jumpStrength);
    }

    // If no key is pressed
    else {
      this.setVelocityX(0);
    }
  }

  /** Initialize Player instance */
  init() {
    // Add Player to scene
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // Configure physics
    this.body.setGravityY(500);
    this.setCollideWorldBounds(true);
  }

  /** Custom update function for scene's update method */
  sceneUpdate() {
    this.executeInputControls();
  }

  /** Set up scene event listeners */
  setEventListeners() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.sceneUpdate, this);
  }

  //////////////////////////////////////////////////////////////////////////////
  // END ENTITY LOGIC FUNCTIONS
  //////////////////////////////////////////////////////////////////////////////
}

export default Player;
