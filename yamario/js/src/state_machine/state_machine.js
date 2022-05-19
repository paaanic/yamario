let idCount = 0;


export default class StateMachine {
    init() {
        this.id = (++idCount).toString();
        this.context = null;
        this.states = new Map();

        this.previousState = null;
        this.currentState = null;
        this.isSwitchingState = false;
        this.switchStateQueue = [];

    }

    constructor(context = null, id = '') {
        this.init();
        this.context = context;
        this.id = id;
    }

    isCurrentState(name) {
        if (!this.currentState) {
            return false;
        }

        return this.currentState.name === name;
    }

    get previousStateName() {
        if (!this.previousState) {
            return ''
        }

        return this.previousState.name;
    }

    addState(name, config) {
        this.states.set(name, {
            name: name,
            onEnter: config.onEnter?.bind(this.context),
            onUpdate: config.onUpdate?.bind(this.context),
            onExit: config.onExit?.bind(this.context)
        });
        return this;
    }

    setState(name) {
        if (!this.states.has(name)) {
            return;
        }
        
        if (this.isSwitchingState) {
            this.switchStateQueue.push(name);
            return;
        }

        this.isSwitchingState = true;

        console.log(`[StateMachine (${this.id})] change from ${this.currentState?.name} to ${name}`);

        if (this.currentState && this.currentState.onExit) {
            this.currentState.onExit();
        }

        this.previousState = this.currentState;
        this.currentState = this.states.get(name);

        if (this.currentState.onEnter) {
            this.currentState.onEnter();
        }

        this.isSwitchingState = false;

        return this;
    }

    update(dt) {
        if (this.switchStateQueue.length > 0) {
            const name = this.switchStateQueue.shift();
            this.setState(name);
            return;
        }

        if (!this.currentState) {
            return;
        }

        if (this.currentState?.onUpdate) {
            this.currentState.onUpdate(dt);
        }
    }
}