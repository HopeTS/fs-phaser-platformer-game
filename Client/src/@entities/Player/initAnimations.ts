/** Add all player animations */
export default (anims: Phaser.Animations.AnimationManager) => {
  // idle
  const idle = anims.create({
    key: "idle",
    frames: anims.generateFrameNumbers("player", {
      start: 0,
      end: 8,
    }),
    frameRate: 10,
    duration: 800,
    repeat: -1,
  });

  // run
  const run = anims.create({
    key: "run",
    frames: anims.generateFrameNumbers("player", {
      start: 9,
      end: 16,
    }),
    frameRate: 8,
    duration: 800,
    repeat: -1,
  });

  // Validate animations
  if (!idle) console.error("Something went wrong initializing idle animation");
  if (!run) console.error("Something went wrong initializing run animation");
};
