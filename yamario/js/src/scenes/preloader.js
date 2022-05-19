export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        this.load
            .image('player', '/assets/yamario/player/default.png')
            .image('icon:coin', '/assets/yamario/icons/coin.png')
            .image('icon:life', '/assets/yamario/icons/life.png')
            .spritesheet(
                'player:idle', '/assets/yamario/player/idle.png', {frameWidth: 22, frameHeight: 28}
            )
            .spritesheet(
                'player:walk', '/assets/yamario/player/walk.png', {frameWidth: 23, frameHeight: 28}
            )
            .spritesheet(
                'player:jump', '/assets/yamario/player/jump.png', {frameWidth: 24, frameHeight: 28}
            )
            .spritesheet(
                'player:roll', '/assets/yamario/player/roll.png', {frameWidth: 22, frameHeight: 22}
            )
            .spritesheet('coin', '/assets/yamario/objects/coin.png', {frameWidth: 32, frameHeight: 31})
            .spritesheet(
                'enemy:walk', '/assets/yamario/objects/enemy/walk.png', {frameWidth: 16, frameHeight: 16}
            )
            .spritesheet(
                'enemy:die', '/assets/yamario/objects/enemy/die.png', {frameWidth: 16, frameHeight: 8}
            )
            .spritesheet(
                'jump-booster', '/assets/yamario/objects/jump_booster.png', 
                {frameWidth: 96, frameHeight: 32}
            )
            .spritesheet(
                'jump-s-booster', '/assets/yamario/objects/jump_s_booster.png', 
                {frameWidth: 191, frameHeight: 64}
            )
            .image('extra-life', '/assets/yamario/objects/life.png')
            .image('moving-platform', '/assets/yamario/objects/moving_platform.png')
            .image('moving-v-platform', '/assets/yamario/objects/moving_v_platform.png')
            .image('tiles', '/assets/yamario/tiles/tileset.png')
            .tilemapTiledJSON('tilemap', '/assets/yamario/tilemaps/map.json')
            .bitmapFont(
                'marioFont', '/assets/yamario/fonts/super-mario-256.png', '/assets/yamario/fonts/super-mario-256.xml'
            )
            .audio('bgm', '/assets/yamario/snd/main-theme.ogg')
            .audio('sfx:coin', '/assets/yamario/snd/coin.ogg')
            .audio('sfx:game-over', '/assets/yamario/snd/game-over.ogg')
            .audio('sfx:jump', '/assets/yamario/snd/jump.ogg')
            .audio('sfx:lost-life', '/assets/yamario/snd/lost-life.ogg');
    }

    create() {
        this.scene.start('game');
    }
}