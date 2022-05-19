import StateMachine from '../state_machine/state_machine.js';
import {events} from '../scenes/event_center.js';


export default class PlayerController {
    constructor(scene, sprite, cursors) {
        this.sprite = sprite;
        this.cursors = cursors;
        this.scene = scene;

        this.stateMachine = new StateMachine(this, 'player');
        this.stateMachine
            .addState('idle', {
                onEnter: this.idleOnEnter,
                onUpdate: this.idleOnUpdate
            })
            .addState('walk', {
                onEnter: this.walkOnEnter,
                onUpdate: this.walkOnUpdate
            })
            .addState('jump', {
                onEnter: this.jumpOnEnter,
                onUpdate: this.jumpOnUpdate,
                onExit: this.jumpOnExit
            })
            .addState('jumpBoost', {
                onEnter: this.jumpBoostOnEnter,
                onUpdate: this.jumpBoostOnUpdate,
                onExit: this.jumpBoostOnExit
            })
            .addState('jumpSuperBoost', {
                onEnter: this.jumpSuperBoostOnEnter,
                onUpdate: this.jumpSuperBoostOnUpdate,
                onExit: this.jumpSuperBoostOnExit
            })
            .addState('roll', {
                onEnter: this.rollOnEnter,
                onUpdate: this.rollOnUpdate
            })
            .addState('fall', {
                onEnter: this.fallOnEnter,
                onUpdate: this.fallOnUpdate
            })
            .setState('idle');

            events
                .on(
                    'collide:player-defaultBooster', 
                    () => this.stateMachine.setState('jumpBoost'), 
                    this
                )
                .on(
                    'collide:player-superBooster', 
                    () => this.stateMachine.setState('jumpSuperBoost'), 
                    this
                );

    }

    update(dt) {
        this.stateMachine.update(dt);
    }

    idleOnEnter() {
        this.sprite.setVelocityX(0);
        this.sprite.play('idle');
        this.adjustBodySize();
    }

    idleOnUpdate(dt) {
        if (this.cursors.left.isDown || this.cursors.right.isDown) {
            this.stateMachine.setState('walk');
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.stateMachine.setState('jump');
        }
    }

    walkOnEnter() {
        this.sprite.play('walk');
        this.adjustBodySize();
    }

    walkOnUpdate(dt) {
        if (this.cursors.left.isDown) {
            this.sprite.move(-1);
        } else if (this.cursors.right.isDown) {
            this.sprite.move(1);
        } else {
            this.sprite.move(0);
            this.stateMachine.setState('idle');
        }
        
        if (!this.sprite.body.blocked.down) {
            this.stateMachine.setState('fall');
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.stateMachine.setState('jump');
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.stateMachine.setState('roll');
        }
    }

    jumpOnEnter() {
        this.scene.sfx.jump.play(); 
        this.sprite.play('jump');
        this.adjustBodySize();
        this.sprite.jump();
    }

    jumpOnUpdate(dt) {
        if (this.sprite.body.blocked.down) {
            if (this.sprite.anims.getName() === 'roll') {
                this.stateMachine.setState('roll');
            } else {
                this.stateMachine.setState('idle');
            }
        }

        if (this.cursors.left.isDown) {
            this.sprite.move(-1);
        } else if (this.cursors.right.isDown) {
            this.sprite.move(1);
        } else {
            this.sprite.move(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.down) && !this.rolled) {
            this.rolled = true;
            this.sprite.play('roll');
            this.adjustBodySize();
        }

        if (Phaser.Input.Keyboard.JustUp(this.cursors.down)) {
            this.sprite.play('jump');
            this.adjustBodySize();
        }
    }

    jumpOnExit() {
        this.rolled = false;
    }

    jumpBoostOnEnter() {
        this.sprite.play('jump');
        this.adjustBodySize();
        this.sprite.jump(1.25);
        this.sprite.body.blocked.down = false;
    }

    jumpBoostOnUpdate(dt) {
        if (this.sprite.body.blocked.down) {
            if (this.sprite.anims.getName() === 'roll') {
                this.stateMachine.setState('roll');
            } else {
                this.stateMachine.setState('idle');
            }
        }

        if (this.cursors.left.isDown) {
            this.sprite.move(-1);
        } else if (this.cursors.right.isDown) {
            this.sprite.move(1);
        } else {
            this.sprite.move(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.down) && !this.rolled) {
            this.rolled = true;
            this.sprite.play('roll');
            this.adjustBodySize();
        }

        if (Phaser.Input.Keyboard.JustUp(this.cursors.down)) {
            this.sprite.play('jump');
            this.adjustBodySize();
        }
    }

    jumpBoostOnExit() {
        this.rolled = false;
    }

    jumpSuperBoostOnEnter() {
        this.sprite.play('jump');
        this.adjustBodySize();
        this.sprite.jump(1.5);
        this.sprite.body.blocked.down = false;
    }

    jumpSuperBoostOnUpdate(dt) {
        if (this.sprite.body.blocked.down) {
            if (this.sprite.anims.getName() === 'roll') {
                this.stateMachine.setState('roll');
            } else {
                this.stateMachine.setState('idle');
            }
        }

        if (this.cursors.left.isDown) {
            this.sprite.move(-1);
        } else if (this.cursors.right.isDown) {
            this.sprite.move(1);
        } else {
            this.sprite.move(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.down) && !this.rolled) {
            this.rolled = true;
            this.sprite.play('roll');
            this.adjustBodySize();
        }

        if (Phaser.Input.Keyboard.JustUp(this.cursors.down)) {
            this.sprite.play('jump');
            this.adjustBodySize();
        }
    }

    jumpSuperBoostOnExit() {
        this.rolled = false;
    }

    fallOnEnter() {
        this.sprite.play('jump');
        this.adjustBodySize();
    }

    fallOnUpdate() {
        if (this.cursors.left.isDown) {
            this.sprite.move(-1);
        } else if (this.cursors.right.isDown) {
            this.sprite.move(1);
        } 
        
        if (this.sprite.body.blocked.down) {
            this.stateMachine.setState('idle');
        }
    }

    rollOnEnter() {
        this.sprite.play('roll');
        this.adjustBodySize();
    }
    
    rollOnUpdate(dt) {
        if (this.cursors.left.isDown) {
            this.sprite.move(-1);
        } else if (this.cursors.right.isDown) {
            this.sprite.move(1);
        } else {
            this.sprite.move(0);
            this.stateMachine.setState('idle');
        }
    
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.stateMachine.setState('jump');
        }

        if (Phaser.Input.Keyboard.JustUp(this.cursors.down)) {
            this.stateMachine.setState('walk');
        }
    }

    jumpNRollOnEnter() {
        this.sprite.play('roll');
        this.adjustBodySize();
    }

    jumpNRollOnUpdate(dt) {
        if (this.sprite.body.blocked.down) {
            this.stateMachine.setState('roll');
        }

        if (this.cursors.left.isDown) {
            this.sprite.move(-1);
        } else if (this.cursors.right.isDown) {
            this.sprite.move(1);
        }

        if (Phaser.Input.Keyboard.JustUp(this.cursors.down)) {
            this.sprite.play('jump');
        }
    }

    adjustBodySize() {
        this.sprite.body.setSize(this.sprite.frame.width, this.sprite.frame.height, false);
    }
}