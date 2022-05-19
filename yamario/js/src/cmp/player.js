export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;

        this.anims.create({
            key: 'idle',
            frames: 'player:idle',
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'walk',
            frames: 'player:walk',
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: 'player:jump',
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'roll',
            frames: 'player:roll',
            frameRate: 12,
            repeat: -1
        });
    }

    update() {
        this.adjustSize();
    }

    move(dir) {
        const SPEED = 200;
        this.body.setVelocityX(dir * SPEED);

        if (this.body.velocity.x < 0) {
            this.flipX = true;
        } else if (this.body.velocity.x > 0) {
            this.flipX = false;
        }
        
    }

    jump(boost = 1) {
        const SPEED = 500;
        if (this.body.blocked.down) {
            this.body.setVelocityY(-boost*SPEED);
        }
    }

    adjustSize() {
        this.body.setSize(this.frame.width, this.frame.height, false);
    }
}