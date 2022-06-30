import { GameMap } from '/static/js/GameMap.js';
import { Character } from '/static/js/Character.js';
import { kyo } from '/static/js/kyo.js';
class Kof {
    constructor(id) {
        this.$kof = $('#' + id);

        this.gameMap = new GameMap(this);
        this.players = [
            new kyo(
                this,
                {
                    id: 0,
                    x: 0,
                    y: 0,
                    width: 120,
                    height: 200,
                    color: 'blue'
                }
            ),
            new kyo(
                this,
                {
                    id: 1,
                    x: 1000,
                    y: 0,
                    width: 120,
                    height: 200,
                    color: 'red'
                }
            )
        ]
    }
}

export { Kof };