export class Controller {
    constructor(canvas) {
        this.canvas = canvas;

        this.pressed = new Set();
        this.init();
    }

    init() {
        let t = this;
        this.canvas.keydown(function (e) {
            t.pressed.add(e.key);
            console.log(t.pressed.has('a'));
        })

        this.canvas.keyup(function (e) {
            t.pressed.delete(e.key);
        })
    }
}