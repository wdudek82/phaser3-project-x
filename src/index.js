import Phaser from 'phaser';
import { img, move, char } from './constants';
import './index.css';

let cursors;
let platforms;
let player;
let stars;
let score = 0;
let scoreText;
let bombs;
let hp = 100;
let hpText;

function preload() {
  console.log(this);
  this.load.image(img.grass, 'assets/images/grass.png');
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

function hitBomb(player, bomb) {
  if (hp <= 0) {
    this.physics.add.collider(player, bombs, hitBomb, null, this);
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play(move.turn);
    gameOver = true;
  } else {
    hp -= 5;
    hpText.setText(`HP: ${hp}`);
  }
}

function collectStar(player, star) {
  star.disableBody(true, true);

  score += 10;
  scoreText.setText(`Score: ${score}`);

  if (stars.countActive(true) === 0) {
    stars.children.iterate((child) => {
      child.enableBody(true, child.x, 0, true, true);
    });

    const x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    const bomb = bombs.create(x, 16, img.bomb);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;
  }
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

  player = this.physics.add.sprite(400, 300, char.down);

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

  // Stars group
  // stars = this.physics.add.group({
  //   key: img.star,
  //   repeat: 11,
  //   setXY: { x: 12, y: 0, stepX: 70 },
  // });
  //
  // stars.children.iterate((child) => {
  //   child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
  // });

  // Bombs group
  bombs = this.physics.add.group();

  // Colliders
  this.physics.add.collider(player, platforms);
  // this.physics.add.collider(stars, platforms);
  // this.physics.add.collider(bombs, platforms);
  this.physics.add.overlap(player, bombs, hitBomb, null, this);

  // this.physics.add.overlap(player, stars, collectStar, null, this);

  cursors = this.input.keyboard.createCursorKeys();

  scoreText = this.add.text(16, 16, 'Score: 0', {
    fontSize: '32px',
    fill: '#000 ',
  });

  hpText = this.add.text(650, 16, 'HP: 100', {
    fontSize: '32px',
    fill: '#000',
  });
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
    player.setVelocity(-100, 0);
    player.anims.play(move.left, true);
  } else if (cursors.right.isDown) {
    player.setVelocity(100, 0);
    player.anims.play(move.right, true);
  } else if (cursors.up.isDown) {
    player.setVelocity(0, -100);
    player.anims.play(move.up, true);
  } else if (cursors.down.isDown) {
    player.setVelocity(0, 100);
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
