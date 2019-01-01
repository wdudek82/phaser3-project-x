import Phaser from 'phaser';
import { img, move, char } from './constants';
import './index.css';

let cursors;
let platforms;
let player;

function preload() {
  console.log(this);
  this.load.image(img.grass, 'assets/images/grass_15.png');
  this.load.image(img.sky, 'assets/images/sky.png');
  this.load.image(img.ground, 'assets/images/platform.png');
  this.load.image(img.star, 'assets/images/star.png');
  this.load.image(img.bomb, 'assets/images/bomb.png');
  this.load.spritesheet(img.avatar, 'assets/images/avatar.png', {
    frameWidth: 32,
    frameHeight: 48,
  });

  // Character sprites
  const characterRoot = 'assets/images/TopDownCharacter/Character';
  const characterFrame = {
    frameWidth: 32,
    frameHeight: 32,
  };

  this.load.spritesheet(
    char.up,
    `${characterRoot}/Character_Up.png`,
    characterFrame,
  );
  this.load.spritesheet(
    char.down,
    `${characterRoot}/Character_Down.png`,
    characterFrame,
  );
  this.load.spritesheet(
    char.right,
    `${characterRoot}/Character_Right.png`,
    characterFrame,
  );
  this.load.spritesheet(
    char.left,
    `${characterRoot}/Character_Left.png`,
    characterFrame,
  );
}

function create() {
  this.add.image(400, 300, img.grass); // .setOrigin(0, 0);

  // Platform static group
  platforms = this.physics.add.staticGroup();
  platforms
    .create(400, 568, img.ground)
    .setScale(2)
    .refreshBody();
  platforms.create(600, 400, img.ground);
  platforms.create(50, 250, img.ground);
  platforms.create(750, 220, img.ground);

  player = this.physics.add.sprite(400, 300, char.down).setDisplaySize(64, 64);

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: move.turnUp,
    frames: [
      {
        key: char.up,
        frame: 0,
      },
    ],
  });

  this.anims.create({
    key: move.up,
    frames: this.anims.generateFrameNumbers(char.up, { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: move.right,
    frames: this.anims.generateFrameNumbers(char.right, { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: move.turnDown,
    frames: [
      {
        key: char.down,
        frame: 0,
      },
    ],
  });

  this.anims.create({
    key: move.down,
    frames: this.anims.generateFrameNumbers(char.down, { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: move.left,
    frames: this.anims.generateFrameNumbers(char.left, { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  // Colliders
  this.physics.add.collider(player, platforms);

  cursors = this.input.keyboard.createCursorKeys();
}

// function setVelocityXY(velocityX, velocityY) {
//   player.setVelocity()
// }

function update() {
  if (cursors.up.isDown && cursors.left.isDown) {
    player.setVelocity(-100, -100);
    player.anims.play(move.left, true);
  } else if (cursors.up.isDown && cursors.right.isDown) {
    player.setVelocity(100, -100);
    player.anims.play(move.right, true);
  } else if (cursors.down.isDown && cursors.left.isDown) {
    player.setVelocity(-100, 100);
    player.anims.play(move.left, true);
  } else if (cursors.down.isDown && cursors.right.isDown) {
    player.setVelocity(100, 100);
    player.anims.play(move.right, true);
  } else if (cursors.left.isDown) {
    player.setVelocity(-130, 0);
    player.anims.play(move.left, true);
  } else if (cursors.right.isDown) {
    player.setVelocity(130, 0);
    player.anims.play(move.right, true);
  } else if (cursors.up.isDown) {
    player.setVelocity(0, -130);
    player.anims.play(move.up, true);
  } else if (cursors.down.isDown) {
    player.setVelocity(0, 130);
    player.anims.play(move.down, true);
  } else {
    player.setVelocity(0, 0);
    player.anims.play(move.turnDown, true);
  }
}

/*
 * Configuration
 */
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0,
      },
      debug: false,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);
