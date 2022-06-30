let GameObjects = []
class GameObject {
    constructor() {
        GameObjects.push(this);
        console.log('created');
        this.timeDiff = 0;
        this.started = false;
    }

    start() {
        this.started = true;
    }

    update() {

    }

    delete() {
        for (let i in GameObjects) {
            if (GameObjects[i] === this) {
                GameObjects.splice(i, 1);
                break;
            }
        }
    }
}

let lastTimeStamp = 0;

let frame = (timeStamp) => {
    for (let obj of GameObjects) {
        if (obj.started) {
            obj.timeDiff = timeStamp - lastTimeStamp;
            obj.update();
        } else {
            obj.started = true;
            obj.start();
        }
    }

    lastTimeStamp = timeStamp;
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

export { GameObject }