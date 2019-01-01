import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import '../index.css';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 800,
      },
      debug: false,
    },
  },
  scene: [BootScene, GameScene],
};

/* eslint-disable no-unused-vars */
const game = new Phaser.Game(config);
