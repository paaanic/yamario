export default class Coin extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'coin', 0);
        scene.add.existing(this);
        scene.coins.add(this);
        
        this
            .setOrigin(0)
            .setScale(0.75)
            .body
                .setAllowGravity(false);

        this.anims.create({
            key: 'flip',
            frames: 'coin',
            frameRate: 8,
            repeat: -1
        });

        this.anims.play('flip');
    }
}