import { GameObject } from '/static/js/GameObject.js';

export class Character extends GameObject {
    constructor(root, info) {
        super();

        this.root = root;
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;
        this.direction = 1;
        this.state = 3;
        this.vx = 0;
        this.vy = 0;
        this.health = 100;
        this.damage = 35;

        this.speedx = 400;
        this.speedy = 1000;
        this.g = 60;

        this.c = this.root.gameMap.c;
        this.pressed = this.root.gameMap.controller.pressed;
        this.animation = new Map();
        this.frameCnt = 0;
    }

    start() {

    }

    update() {
        this.keyControl();
        this.move();
        this.updateDirection();
        this.render();
        this.updateAttack();
    }

    render() {
        // this.c.fillStyle = this.color;
        // this.c.fillRect(this.x, this.y, this.width, this.height);
        //check if should face right
        if (this.state == 1 && this.direction * this.vx < 0) {
            this.state = 2;
        }


        let cur = this.animation.get(this.state);
        if (cur && cur.loaded) {
            let u = parseInt(this.frameCnt / cur.frameRate) % cur.frameCnt;
            let img = cur.gif.frames[u].image;
            if (this.direction > 0) {
                this.c.drawImage(img, this.x, this.y + cur.offsetY, img.width * cur.scale, img.height * cur.scale);
            } else {
                this.c.save();
                this.c.scale(-1, 1);
                this.c.translate(-this.root.gameMap.$canvas.width(), 0);
                this.c.drawImage(img, this.root.gameMap.$canvas.width() - this.x - this.width, this.y + cur.offsetY, img.width * cur.scale, img.height * cur.scale);
                this.c.restore();
            }
            this.frameCnt++;
        }

        //exit attacking & being attacked state
        if (this.state == 4 || this.state == 5) {
            if (parseInt(this.frameCnt / cur.frameRate) > cur.frameCnt - 1) {
                this.state = 0;
                this.frameCnt = 0;
            }
        }

        if (this.state == 6) {
            if (parseInt(this.frameCnt / cur.frameRate) > cur.frameCnt - 1) {
                this.frameCnt--;
            }
        }
    }

    move() {

        this.vy += this.g;
        if (this.state == 6) {
            this.vx = 0;
        }
        this.x += this.vx * this.timeDiff / 1000;
        this.y += this.vy * this.timeDiff / 1000;



        if (this.y >= 450) {
            this.vy = 0;
            this.y = 450;
        }

        if (this.x < 0)
            this.x = 0;
        if (this.x + this.width > this.root.gameMap.$canvas.width())
            this.x = this.root.gameMap.$canvas.width() - this.width;

        let players = this.root.players;
        let enemy = players[1 - this.id];

        let c1 = {
            x1: this.x,
            x2: this.x + this.width,
            y1: this.y,
            y2: this.y + this.height
        }

        let c2 = {
            x1: enemy.x,
            x2: enemy.x + enemy.width,
            y1: enemy.y,
            y2: enemy.y + enemy.height
        }

        if (this.isCollidiing(c1, c2) && enemy.state != 6 && this.state != 6) {
            this.x -= this.vx * this.timeDiff / 1000;
        }

    }

    keyControl() {
        let w, a, d, space;
        if (this.id == 0) {
            w = this.pressed.has('w');
            a = this.pressed.has('a');
            d = this.pressed.has('d');
            space = this.pressed.has(' ');
        } else {
            w = this.pressed.has('ArrowUp');
            a = this.pressed.has('ArrowLeft');
            d = this.pressed.has('ArrowRight');
            space = this.pressed.has('Enter');
        }

        if (this.state == 0 || this.state == 1 || this.state == 2) {
            if (space) {
                this.state = 4;
                this.vx = 0;
                this.frameCnt = 0;
            } else if (w) {
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = -this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = -this.speedy;
                this.state = 3;
                this.frameCnt = 0;
            } else if (d) {
                this.vx = this.speedx;
                this.state = 1;
            } else if (a) {
                this.vx = -this.speedx;
                this.state = 1;
            } else {
                this.vx = 0;
                this.state = 0;
            }
        } else if (this.state == 3) {
            if (this.y >= 450) this.state = 0;
        }
    }

    updateDirection() {
        let players = this.root.players;
        if (players[0] && players[1] && this.state != 6) {
            if (this.x < players[parseInt(1 - this.id)].x) {
                this.direction = 1;
            } else {
                this.direction = -1;
            }
        }
    }


    updateAttack() {

        if (this.state == 4 && this.frameCnt == 18) {
            let players = this.root.players;
            let enemy = players[1 - this.id];
            let c1;
            if (this.direction > 0) {
                c1 = {
                    x1: this.x + 120,
                    x2: this.x + 120 + 100,
                    y1: this.y + 40,
                    y2: this.y + 60
                }
            } else {
                c1 = {
                    x1: this.x + this.width - 220,
                    x2: this.x + this.width - 120,
                    y1: this.y + 40,
                    y2: this.y + 60
                }
            }

            let c2 = {
                x1: enemy.x,
                x2: enemy.x + enemy.width,
                y1: enemy.y,
                y2: enemy.y + enemy.height
            }

            if (this.isCollidiing(c1, c2)) {
                enemy.isAttacked();
            }
        }

    }

    isCollidiing(c1, c2) {
        if (Math.max(c1.x1, c2.x1) > Math.min(c1.x2, c2.x2))
            return false;
        if (Math.max(c1.y1, c2.y1) > Math.min(c1.y2, c2.y2))
            return false;
        return true;
    }

    isAttacked() {
        if (this.state == 6) return;
        this.state = 5;
        this.frameCnt = 0;

        this.health -= 50;
        this.health = Math.max(this.health, 0);
        if (this.health <= 0) {
            this.frameCnt = 0;
            this.state = 6;
        }
    }
}