/** Attributes for a collidable entity */
export default {
  /** Add collision with other game object */
  addCollider(
    /** Other game object */
    otherGameObject: any,
    /** Callback function to run when collisiono occurs */
    callback?: () => void
  ) {
    this.scene.physics.add.collider(
      this,
      otherGameObject,
      callback,
      null,
      this
    );
  },
};
