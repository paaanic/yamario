export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        this.load
            .image('player', '/yamario/assets/yamario/player/default.png')
            .image('icon:coin', '/yamario/assets/yamario/icons/coin.png')
            .image('icon:life', '/yamario/assets/yamario/icons/life.png')
            .spritesheet(
                'player:idle', '/yamario/assets/yamario/player/idle.png', {frameWidth: 22, frameHeight: 28}
            )
            .spritesheet(
                'player:walk', '/yamario/assets/yamario/player/walk.png', {frameWidth: 23, frameHeight: 28}
            )
            .spritesheet(
                'player:jump', '/yamario/assets/yamario/player/jump.png', {frameWidth: 24, frameHeight: 28}
            )
            .spritesheet(
                'player:roll', '/yamario/assets/yamario/player/roll.png', {frameWidth: 22, frameHeight: 22}
            )
            .spritesheet('coin', '/yamario/assets/yamario/objects/coin.png', {frameWidth: 32, frameHeight: 31})
            .spritesheet(
                'enemy:walk', '/yamario/assets/yamario/objects/enemy/walk.png', {frameWidth: 16, frameHeight: 16}
            )
            .spritesheet(
                'enemy:die', '/yamario/assets/yamario/objects/enemy/die.png', {frameWidth: 16, frameHeight: 8}
            )
            .spritesheet(
                'jump-booster', '/yamario/assets/yamario/objects/jump_booster.png', 
                {frameWidth: 96, frameHeight: 32}
            )
            .spritesheet(
                'jump-s-booster', '/yamario/assets/yamario/objects/jump_s_booster.png', 
                {frameWidth: 191, frameHeight: 64}
            )
            .image('extra-life', '/yamario/assets/yamario/objects/life.png')
            .image('moving-platform', '/yamario/assets/yamario/objects/moving_platform.png')
            .image('moving-v-platform', '/yamario/assets/yamario/objects/moving_v_platform.png')
            .image('tiles', '/yamario/assets/yamario/tiles/tileset.png')
            .tilemapTiledJSON('tilemap', '/yamario/assets/yamario/tilemaps/map.json')
            .bitmapFont(
                'marioFont', '/yamario/assets/yamario/fonts/super-mario-256.png', '/yamario/assets/yamario/fonts/super-mario-256.xml'
            )
            .audio('bgm', '/yamario/assets/yamario/snd/main-theme.ogg')
            .audio('sfx:coin', '/yamario/assets/yamario/snd/coin.ogg')
            .audio('sfx:game-over', '/yamario/assets/yamario/snd/game-over.ogg')
            .audio('sfx:jump', '/yamario/assets/yamario/snd/jump.ogg')
            .audio('sfx:lost-life', '/yamario/assets/yamario/snd/lost-life.ogg');
    }

    create() {
        this.scene.start('game');
    }
}