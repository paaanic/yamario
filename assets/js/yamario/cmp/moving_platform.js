const _Direction = {
    HOR: 0,
    VERT: 1
}


export default class MovingPlatform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, dir) {
        let name = dir === 0 ? 'moving-platform' : 'moving-v-platform';

        super(scene, x, y, name);
        scene.movingPlatforms.add(this);
        scene.add.existing(this);

        this
            .setOrigin(0)
            .setBounce(1)
            .setImmovable()
            .body
                .setFrictionX(1)
                .setAllowGravity(false);

        const SPEED = 100;
        if (dir === 0) {
            this.setVelocityX(SPEED);
        } else if (dir === 1) {
            this.setVelocityY(SPEED);
        }
    }
}


