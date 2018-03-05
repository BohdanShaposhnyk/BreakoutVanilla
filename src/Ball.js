/**
 * Created by bohdan on 05.03.2018.
 */


export default class Ball {
    constructor({radius=10, fillStyle='#0095DD'}, context) {
        this.radius = radius;
        this.fillStyle=fillStyle;
        this.context = context;
    }

    draw({x, y}) {
        this.context.beginPath();
        this.context.arc(x, y, this.radius, 0, Math.PI*2);
        this.context.fillStyle = this.fillStyle;
        this.context.fill();
        this.context.closePath();
    }
}