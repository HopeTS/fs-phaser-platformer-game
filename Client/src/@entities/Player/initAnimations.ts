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
    repeat: -1,
    duration: 800,
  });

  // run
  const run = anims.create({
    key: "run",
    frames: anims.generateFrameNumbers("player", {
      start: 9,
      end: 16,
    }),
    frameRate: 8,
    repeat: -1,
    duration: 800,
  });

  // jump
  const jump = anims.create({
    key: "jump",
    frames: anims.generateFrameNumbers("player", { start: 17, end: 23 }),
    frameRate: 8,
    repeat: -1,
    duration: 800,
  });

  // Validate animations
  if (!idle) console.error("Something went wrong initializing idle animation");
  if (!run) console.error("Something went wrong initializing run animation");
  if (!jump) console.error("Something went wrong initializing jump animation");
};
