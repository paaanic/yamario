export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, dir) {
        super(scene, x, y, 'enemy:walk', 0);
        scene.add.existing(this);
        scene.enemies.add(this);

        const SPEED = 100 / 10;

        this
            .setOrigin(0, 1)
            .setBounceX(1)
            .setVelocityX(dir*SPEED)
            .body
                .setImmovable(true);

        this.anims.create({
            key: 'walk',
            frames: 'enemy:walk',
            frameRate: 8, 
            repeat: -1
        });
        this.anims.create({
            key: 'die',
            frames: 'enemy:die',
            frameRate: 8, 
            repeat: 4
        });

        this.anims.play('walk');

        this.on('animationcomplete-die', this.destroy)
    }
}