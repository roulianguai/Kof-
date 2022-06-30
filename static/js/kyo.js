import { Character } from "/static/js/Character.js";
import { GIF } from "/static/js/utils/GifHelper.js";
export class kyo extends Character {
    constructor(root, info) {
        super(root, info);
        this.initAnimation();
    }

    initAnimation() {
        let offsets = [0, -22, -22, -140, 0, 0, 0];
        for (let i = 0; i < 7; i++) {
            let gif = new GIF();
            gif.load(`/static/images/player/kyo/${i}.gif`);
            this.animation.set(i, {
                gif: gif,
                frameCnt: 0,
                frameRate: 5,
                offsetY: offsets[i],
                scale: 2,
                loaded: false
            });

            let t = this;

            gif.onload = function () {
                let obj = t.animation.get(i);
                obj.frameCnt = gif.frames.length;
                obj.loaded = true;
                if (i == 3)
                    obj.frameRate = 3;
            }
        }
    }
}