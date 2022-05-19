import {events} from './event_center.js';


export default class HUDScene extends Phaser.Scene {
    constructor() {
        super('hud');
    }

    create() {
        const {width, height} = this.scale;

        this.hud = this.add.container(10, 10);
        this.hud
            .add(this.setLifesWidget())
            .add(this.setCoinsWidget());
             
        events.on('player:collect:coin', this.updateCoinsWidget, this);
        events.on('player:collect:life', this.updateLifesWidget, this);
        events.on('player:damagedBy:enemy', this.updateLifesWidget, this);

        events.once(Phaser.Scenes.Events.DESTROY, () => {
            events.off('player:collect:coin');
            events.off('player:collect:life');
        }, this);
    }

    updateCoinsWidget() {
        this.coinsCount.setText(`x${this.registry.get('coinsCount')}`);
    }

    updateLifesWidget() {
        let lifesCount = this.registry.get('lifesCount');
        if (lifesCount > this.lifesWidget.length) {
            for (let i = 0; i < (lifesCount - this.lifesWidget.length); i++) {
                let lifeIcon = this.add.image(0, 0, 'icon:life');
                lifeIcon
                    .setOrigin(1, 0)
                    .setX(-this.lifesWidget.last.x - 5);
            }
        } else if (lifesCount < this.lifesWidget.length) {
            for (let i = 0; i < (this.lifesWidget.length - lifesCount); i++) {
                this.lifesWidget.remove(this.lifesWidget.last);
            }
        }
    }s

    setWidgets() {
        this.setLifesWidget();
        this.setCoinsWidget();
    }

    setLifesWidget() {
        this.lifesWidget = this.add.container(this.scale.width - 20, 0);

        for (let i = 0; i < this.registry.get('lifesCount'); i++) {
            let lifeIcon = this.add.image(0, 0, 'icon:life');
            lifeIcon
                .setOrigin(1, 0)
                .setX(-i*(lifeIcon.width + 5), 0);
            this.lifesWidget.add(lifeIcon);
        }
        console.log(this.lifesWidget)
        return this.lifesWidget;
    }

    setCoinsWidget() {
        this.coinsWidget = this.add.container(0, 0);

        let coinsIcon = this.add.image(0, 0, 'icon:coin');
        coinsIcon.setOrigin(0);
        this.coinsCount = this.add.bitmapText(
            coinsIcon.width + 5, coinsIcon.height / 2, 
            'marioFont', `x${this.registry.get('coinsCount')}`
        );
        this.coinsCount.setOrigin(0, 0.5);
        this.coinsWidget
            .add(coinsIcon)
            .add(this.coinsCount)
        
        return this.coinsWidget;
    }
}