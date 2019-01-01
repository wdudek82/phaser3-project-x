// import Phaser from 'phaser';
import { img } from '../../constants';


class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene',
    });
  }

  preload() {
    console.log('BootScene loaded...');
    this.load.image(img.sky, 'assets/images/sky.png');
    this.load.image(img.ground, 'assets/images/platform.png');
    this.load.image(img.star, 'assets/images/star.png');
    this.load.image(img.bomb, 'assets/images/bomb.png');
    this.load.spritesheet(img.dude, 'assets/images/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
}

export default BootScene;
