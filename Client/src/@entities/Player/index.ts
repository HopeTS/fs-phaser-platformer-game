import Phaser from "phaser";

import initAnimations from "./initAnimations";

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
    this.jumpStrength = 250;

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
    const onFloor = this.body.onFloor();

    // Running / lateral movement
    if (left.isDown) {
      this.setVelocityX(-this.moveSpeed);
    } else if (right.isDown) {
      this.setVelocityX(this.moveSpeed);
    } else {
      this.setVelocityX(0);
    }

    // Jumping
    if ((space.isDown || up.isDown) && onFloor) {
      this.setVelocityY(-this.jumpStrength);
    }
  }

  /** Initialize Player instance */
  init() {
    /** Place player entity in scene */
    const addPlayerToScene = () => {
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
    };

    /** Configure scene physics */
    const configurePhysics = () => {
      this.body.setGravityY(500);
      this.setCollideWorldBounds(true);
    };

    addPlayerToScene();
    configurePhysics();
    initAnimations(this.scene.anims);
  }

  /** Custom update function for scene's update method */
  sceneUpdate() {
    this.executeInputControls();
    this.setAnimation();
  }

  /** Determine which animation to run */
  setAnimation() {
    // Should player run or idle?
    this.body.velocity.x === 0
      ? this.play("idle", true)
      : this.play("run", true);

    // Should player sprite face left or right?
    if (this.body.velocity.x < 0) this.flipX = true;
    else if (this.body.velocity.x > 0) this.flipX = false;
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
