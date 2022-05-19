import Player from '../cmp/player.js';
import Coin from '../cmp/coin.js';
import Enemy from '../cmp/enemy.js';
import MovingPlatform from '../cmp/moving_platform.js';
import PlayerController from '../plugins/player_controller.js';
import JumpBooster from '../cmp/jump_booster.js';
import {events} from "./event_center.js";


export default class GameScene extends Phaser.Scene {
    constructor() {
        super('game');
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.registry.set('lifesCount', 3);
        this.registry.set('coinsCount', 0);
    }

    create() {
        this.bgm = this.sound.add('bgm', {loop: true});
        this.bgm.play();

        this.sfx = {
            coin: this.sound.add('sfx:coin'),
            jump: this.sound.add('sfx:jump'),
            lostLife: this.sound.add('sfx:lost-life'),
            gameOver: this.sound.add('sfx:game-over')
        };

        const {width, height} = this.scale;

        const map = this.make.tilemap({key: 'tilemap'});
        const tileset = map.addTilesetImage('tiles', 'tiles');

        this.groundLayer = map.createLayer('ground', tileset);
        this.groundLayer.setCollisionByProperty({collides: true});

        this.enemies = this.physics.add.group();
        this.coins = this.physics.add.group();
        this.movingPlatforms = this.physics.add.group();
        this.jumpBoosters = this.physics.add.group();
        this.enemyBorders = this.physics.add.group();
        this.platformBorders = this.physics.add.group();

        this.objectsLayer = map.getObjectLayer('objects');
        this.objectsLayer.objects.forEach(objData => {
            const {x, y, name} = {x: objData.x, y: objData.y, name: objData.name};
            switch (name) {
                case 'player-spawn':
                    this.player = new Player(this, x, y);
                    this.playerController = new PlayerController(this, this.player, this.cursors);
                    break;
                case 'coin-spawn':
                    new Coin(this, x, y);
                    break;
                case 'enemy-spawn':
                    new Enemy(this, x, y, objData.properties.dir ?? 1);
                    break;
                case 'moving-platform-spawn': 
                    new MovingPlatform(this, x, y, 0);
                    break;
                case 'moving-v-platform-spawn': 
                    new MovingPlatform(this, x, y, 1);
                    break;
                case 'moving-platform-border':
                    let border = this.add.rectangle(x, y, objData.width, objData.height);
                    this.platformBorders.add(border);
                    border
                        .setOrigin(0)
                        .body
                            .setImmovable()
                            .setAllowGravity(false);
                    break;
                case 'jump-s-booster-spawn':
                    new JumpBooster(this, x, y, 'super');
                    break;
                case 'jump-booster-spawn':
                    new JumpBooster(this, x, y);
                    break;
                default:
                    break;
            }

        });

        this.physics.add.collider(this.player, this.groundLayer, () => {}, null, this);
        this.physics.add.collider(this.enemies, this.groundLayer, () => {}, null, this);
        this.physics.add.collider(
            this.movingPlatforms, this.platformBorders, (platform, border) => {
                platform.body.velocity.x *= -1;
                platform.body.velocity.y *= -1;
            }, null, this
        );

        this.colliders = {
            playerVsJumpBoosters: this.physics.add.collider(
                this.player, this.jumpBoosters, this.playerVsJumpBooster, null, this
            ),
            playerVsMovingPlatforms: this.physics.add.collider(
                this.player, this.movingPlatforms, this.playerVsMovingPlatform, null, this
            ),
            playerVsEnemies: this.physics.add.collider(
                this.player, this.enemies, this.playerVsEnemy, null, this
            )
        };
        
        this.physics.add.overlap(this.player, this.coins, this.playerOverCoin, null, this);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setZoom(1.5);
        this.cameras.main.startFollow(this.player);

        events.once(Phaser.Scenes.Events.DESTROY, () => {
            events.off('collide:player-defaultBooster');
            events.off('collide:player-superBooster');
        }, this);

        this.scene.launch('hud');
    }

    update(t, dt) {
        this.playerController.update(dt);
    }

    playerVsEnemy(player, enemy) {
        if (player.body.touching.down) {
            events.emit('player:kill:enemy');
            enemy.body.setEnable(false);
            enemy.anims.play('die');
            enemy.body.setSize(enemy.frame.width, enemy.frame.height, false);
        } else {
            this.colliders.playerVsEnemies.active = false;

            if (--this.registry.values.lifesCount === 0) {
                this.gameOver();
            }

            events.emit('player:damagedBy:enemy');
            this.time.delayedCall(
                1000, () => {this.colliders.playerVsEnemies.active = true;}, null
            )
        }
    }

    playerVsJumpBooster(player, booster) {
        if (player.body.touching.down) {
            this.sfx.jump.play();
            events.emit(`collide:player-${booster.type}Booster`);
            booster.setFrame(1);
            this.time.addEvent({
                delay: 1000,
                callback: () => booster.setFrame(0)
            });
        }
    }

    playerVsMovingPlatform(player, platform) {

    }

    playerOverCoin(player, coin) {
        this.sfx.coin.play();
        this.registry.values.coinsCount += 10;
        events.emit('player:collect:coin');
        coin.destroy();
    }

    gameOver() {
        this.scene.launch('game-over');
    }
}