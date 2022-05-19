import GameScene from './scenes/game.js';
import HUDScene from './scenes/hud.js';
import LevelSwitchScene from './scenes/level_switch.js';
import PauseScene from './scenes/pause.js';
import PreloaderScene from './scenes/preloader.js';
import GameOverScene from './scenes/game_over.js';


window.onload = function() {
    const config = {
        type: Phaser.WEBGL,
        width: 960, 
        height: 600,
        parent: 'game',
        physics: {
            default: 'arcade',
            arcade: {
                debug: true,
                gravity: {y: 1000}
            }
        },
        render: {
            pixelArt: true
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: [PreloaderScene, GameScene, PauseScene, LevelSwitchScene, HUDScene, GameOverScene]
    };
    
    let game = new Phaser.Game(config);
}