import { GameObject } from '/static/js/GameObject.js';
import { Controller } from '/static/js/Controller.js';

class GameMap extends GameObject {
    constructor(root) {
        super();
        console.log('GameMap created');
        this.root = root;
        this.$canvas = $('<canvas width="1280" height="720" tabindex=0></canvas>')
        this.c = this.$canvas[0].getContext("2d");
        this.root.$kof.append(this.$canvas)
        this.$canvas.focus();
        this.controller = new Controller(this.$canvas);
    }

    start() {

    }

    update() {
        this.render();
    }

    render() {
        this.c.clearRect(0, 0, this.c.canvas.width, this.c.canvas.height);
    }
}

export { GameMap }