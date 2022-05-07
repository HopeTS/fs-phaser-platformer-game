import Phaser from "phaser";

import initAnimations from "./initAnimations";
import config from "./config";
import { PlayScene } from "@scenes";
import { collidable } from "@mixins";

class Player extends Phaser.Physics.Arcade.Sprite {
  body: Phaser.Physics.Arcade.Body;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  scene: PlayScene;

  /** Gravity strength */
  public gravity: number;

  /** Movement speed */
  public moveSpeed: number;

  /** Strength of player's jump */
  public jumpStrength: number;

  /** Number of jumps the player has left */
  public jumpCount: number;

  public addCollider: typeof collidable.addCollider;

  constructor(scene: PlayScene, x: number, y: number, frame?) {
    super(scene, x, y, "player", frame && frame);

    Object.assign(this, collidable);

    // Connect entity to game / IO
    this.scene = scene;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // Configure custom player attributes
    this.gravity = config.gravity;
    this.moveSpeed = config.moveSpeed;
    this.jumpStrength = config.jumpStrength;
    this.jumpCount = config.jumpCount;

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
  handleInputControls() {
    const { left, right, space, up } = this.cursors;

    // Running / lateral movement
    if (left.isDown) {
      this.setVelocityX(-this.moveSpeed);
    } else if (right.isDown) {
      this.setVelocityX(this.moveSpeed);
    } else {
      this.setVelocityX(0);
    }

    this.handleJump();
  }

  /** Handle player jumping */
  handleJump() {
    /** Execute the jump */
    const executeJump = () => {
      this.body.setVelocityY(-this.jumpStrength);
      this.jumpCount--;
    };

    // Reset jump count if on the ground
    if (this.body.onFloor() && this.jumpCount !== config.jumpCount)
      this.jumpCount = config.jumpCount;

    // Can't jump without a jump count
    if (this.jumpCount < 1) return;

    // If space key just pressed
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) executeJump();

    // Or if up key just pressed
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) executeJump();
  }

  /** Handle player running */
  handleRunning() {}

  /** Initialize Player instance */
  init() {
    // Add player colliders
    this.addCollider(this.scene.layers.platformColliders);

    // Place player entity in scene
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // Configure scene physics
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);

    initAnimations(this.scene.anims);
  }

  /** Custom update function for scene's update method */
  sceneUpdate() {
    this.handleInputControls();
    this.setAnimation();
  }

  /** Determine which animation to run */
  setAnimation() {
    // Make sprite face right or left
    if (this.body.velocity.x < 0) this.flipX = true;
    else if (this.body.velocity.x > 0) this.flipX = false;

    // Set proper animation
    this.body.onFloor()
      ? this.body.velocity.x === 0
        ? this.play("idle", true)
        : this.play("run", true)
      : this.play("jump", false);
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
