import Phaser from 'phaser';
import { img, move } from '../../constants';

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    console.log('GameScene constructor this: ', this);
    this.score = 0;
    this.hp = 100;
  }

  preload() {
    this.load.image(img.sky, 'assets/images/sky.png');
    this.load.image(img.ground, 'assets/images/platform.png');
    this.load.image(img.star, 'assets/images/star.png');
    this.load.image(img.bomb, 'assets/images/bomb.png');
    this.load.spritesheet(img.dude, 'assets/images/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    console.log('created...');
    this.add.image(400, 300, img.sky); // .setOrigin(0, 0);

    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(400, 568, img.ground)
      .setScale(2)
      .refreshBody();
    this.platforms.create(600, 400, img.ground);
    this.platforms.create(50, 250, img.ground);
    this.platforms.create(750, 220, img.ground);

    this.player = this.physics.add.sprite(100, 450, img.dude);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: move.left,
      frames: this.anims.generateFrameNumbers(img.dude, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: move.turn,
      frames: [
        {
          key: img.dude,
          frame: 4,
        },
      ],
    });

    this.anims.create({
      key: move.right,
      frames: this.anims.generateFrameNumbers(img.dude, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // Stars group
    this.stars = this.physics.add.group({
      key: img.star,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
    });

    // Bombs group
    this.bombs = this.physics.add.group();

    // Colliders
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this,
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#000 ',
    });

    this.hpText = this.add.text(650, 16, 'HP: 100', {
      fontSize: '32px',
      fill: '#000',
    });
  }

  hitBomb(player, bomb) {
    if (this.hp <= 0) {
      this.physics.add.collider(player, this.bombs, this.hitBomb, null, this);
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play(move.turn);
      // gameOver = true;
    } else {
      this.hp -= 5;
      this.hpText.setText(`HP: ${this.hp}`);
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });

      const x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      const bomb = this.bombs.create(x, 16, img.bomb);
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play(move.left, true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play(move.right, true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play(move.turn);
    }

    if (this.cursors.up.isDown) {
      if (this.player.body.touching.down) {
        console.log('touching down');
        this.player.setVelocityY(-100);
      } else {
        console.log('air jump');
        this.player.setVelocityY(-300);
      }
    }
  }
}

export default GameScene;
