const boostersConfig = {
    default: {
        boostY: 1.25,
        sheetKey: 'jump-booster'
    },
    super: {
        boostY: 2,
        sheetKey: 'jump-s-booster'
    }
}


export default class JumpBooster extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key = 'default') {
        super(scene, x, y, boostersConfig[key].sheetKey, 0);
        scene.add.existing(this);
        scene.jumpBoosters.add(this);
        this.type = key;

        this
            .setOrigin(0)
            .setImmovable()
            .body
                .setAllowGravity(false);

        this.scene.tweens.add({
            targets: this,
            delay: 1000 * Math.floor(Math.random()*3)/3,
            y: this.y - 30,
            yoyo: true,
            repeat: -1,
            ease: Phaser.Math.Easing.Sine.InOut
        });
    }


}