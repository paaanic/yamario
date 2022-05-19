export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        this.load
            .image('player', 'assets/player/default.png')
            .image('icon:coin', 'assets/icons/coin.png')
            .image('icon:life', 'assets/icons/life.png')
            .spritesheet(
                'player:idle', 'assets/player/idle.png', {frameWidth: 22, frameHeight: 28}
            )
            .spritesheet(
                'player:walk', 'assets/player/walk.png', {frameWidth: 23, frameHeight: 28}
            )
            .spritesheet(
                'player:jump', 'assets/player/jump.png', {frameWidth: 24, frameHeight: 28}
            )
            .spritesheet(
                'player:roll', 'assets/player/roll.png', {frameWidth: 22, frameHeight: 22}
            )
            .spritesheet('coin', 'assets/objects/coin.png', {frameWidth: 32, frameHeight: 31})
            .spritesheet(
                'enemy:walk', 'assets/objects/enemy/walk.png', {frameWidth: 16, frameHeight: 16}
            )
            .spritesheet(
                'enemy:die', 'assets/objects/enemy/die.png', {frameWidth: 16, frameHeight: 8}
            )
            .spritesheet(
                'jump-booster', 'assets/objects/jump_booster.png', 
                {frameWidth: 96, frameHeight: 32}
            )
            .spritesheet(
                'jump-s-booster', 'assets/objects/jump_s_booster.png', 
                {frameWidth: 191, frameHeight: 64}
            )
            .image('extra-life', 'assets/objects/life.png')
            .image('moving-platform', 'assets/objects/moving_platform.png')
            .image('moving-v-platform', 'assets/objects/moving_v_platform.png')
            .image('tiles', 'assets/tiles/tileset.png')
            .tilemapTiledJSON('tilemap', 'assets/tilemaps/map.json')
            .bitmapFont(
                'marioFont', 'assets/fonts/super-mario-256.png', 'assets/fonts/super-mario-256.xml'
            )
            .audio('bgm', 'assets/snd/main-theme.ogg')
            .audio('sfx:coin', 'assets/snd/coin.ogg')
            .audio('sfx:game-over', 'assets/snd/game-over.ogg')
            .audio('sfx:jump', 'assets/snd/jump.ogg')
            .audio('sfx:lost-life', 'assets/snd/lost-life.ogg');
    }

    create() {
        this.scene.start('game');
    }
}