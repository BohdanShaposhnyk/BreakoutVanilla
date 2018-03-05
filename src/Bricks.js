/**
 * Created by bohdan on 05.03.2018.
 */

import { bricks as defBricks, bricksFeatures } from './defaults'

export default class Bricks {
    constructor({bricks = defBricks, context}) {
        this.bricks = bricks;
        this.context = context;
    }

    draw() {
        const {
            width,
            height,
            padding,
            rows,
            cols,
            offsetLeft,
            offsetTop
        } = bricksFeatures;
        for ( let col = 0; col < cols; col++) {
            for ( let row = 0; row < rows; row++) {
                if (this.bricks[col][row].status == 0) continue;
                const x = col * (width + padding) + offsetLeft;
                const y = row * (height + padding) + offsetTop;
                this.bricks[col][row].x = x;
                this.bricks[col][row].y = y;
                this.context.beginPath();
                this.context.rect(x, y, width, height);
                this.context.fillStyle = "#0095DD";
                this.context.fill();
                this.context.closePath();
            }
        }
    }
}