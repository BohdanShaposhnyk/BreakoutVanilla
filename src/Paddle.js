/**
 * Created by bohdan on 05.03.2018.
 */

import { canvasSize } from './defaults'

export default class Paddle {
    constructor({
        height=10,
        width=75,
        position = {
            x: (canvasSize.width - width)/2,
            y: canvasSize.height - height
        }
    }, context) {
        this.height = height;
        this.width = width;
        this.position = position;
        this.context = context;
        this.rightPressed = false;
        this.leftPressed = false;
    }

    draw() {
        if (this.leftPressed && this.position.x > 0) this.position.x -= 7;
        if (this.rightPressed && this.position.x < canvasSize.width - this.width) this.position.x +=7;
        this.context.beginPath();
        this.context.rect(this.position.x, canvasSize.height-this.height, this.width, this.height);
        this.context.fillStyle = "#0095DD";
        this.context.fill();
        this.context.closePath();
    }

    keyDownHandler(code) {
        switch (code) {
            case 39:
                this.rightPressed = true;
                break;
            case 37:
                this.leftPressed = true;
                break;
        }
    }

    keyUpHandler(code) {
        switch (code) {
            case 39:
                this.rightPressed = false;
                break;
            case 37:
                this.leftPressed = false;
                break;
        }
    }
}