/**
 * Created by bohdan on 05.03.2018.
 */

import Ball from '../Ball'
import { canvasSize, canvasStyle } from '../defaults'
import Paddle from '../Paddle'
import Bricks from '../Bricks'
import { bricksFeatures } from '../defaults'

export default class Canvas {
    constructor({
        attrs={
            width: canvasSize.width,
            height: canvasSize.height
        },
        style=canvasStyle,
        parent
    }) {
        this._init({attrs, style});
        parent.appendChild(this.me);
    }

    _setAttributes(el, attrs) {
        for (let key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    _setStyle(el, style) {
        for(let key in style) {
            if (el.style && el.style.hasOwnProperty(key)) {
                el.style[key] = style[key];
            }
        }
    }

    _init({attrs, style}){
        this.me = document.createElement('canvas');
        this.me.id = 'myCanvas';
        this.ctx = this.me.getContext('2d');
        this._setAttributes(this.me, attrs);
        this._setStyle(this.me, style);
        this.ball = new Ball({}, this.ctx);
        this.paddle = new Paddle({}, this.ctx);
        this.bricks = new Bricks({context: this.ctx});
        this.score = 0;
    }

    draw(x, y) {
        this.ctx.clearRect(0, 0, this.me.width, this.me.height);
        this.paddle.draw();
        this.bricks.draw();
        this.ball.draw({x, y});
        this.drawScore();

    }

    loop(
        coords={
            x: this.me.width/2,
            y: this.me.height/2
        },
        motion={
            dx: -2,
            dy: 2
        }
    ) {
        let {dx, dy} = motion;
        let {x, y} = coords;
        const game = setInterval(() => {
            if (y + dy < this.ball.radius) {
                dy = -dy;
            } else if (y + dy > this.me.height - this.ball.radius - this.paddle.height) {
                if (x + this.ball.radius > this.paddle.position.x &&
                    x < this.paddle.position.x + this.paddle.width) {
                    dy = -dy;
                } else if (y + dy > this.me.height - this.ball.radius) {
                    alert('GAME OVER');
                    clearInterval(game);
                    document.location.reload();
                }
            }
            if ((x + dx > this.me.width - this.ball.radius) || (x + dx < this.ball.radius)) {
                dx = -dx;
            }
            dy = this.collisionDetection({x, y, dy});
            this.draw(x, y);
            x += dx;
            y += dy;
        }, 10);

    }

    drawScore() {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText("Score: "+ this.score, 8, 20);
    }

    collisionDetection({x , y, dy}) {
        const { width, height } = bricksFeatures;
        const [cols, rows] = [this.bricks.bricks.length, this.bricks.bricks[0].length];
        for ( let col = 0; col < cols; col++) {
            for ( let row = 0; row < rows; row++) {
                const brick = this.bricks.bricks[col][row];
                if (x + this.ball.radius > brick.x &&
                    x - this.ball.radius < brick.x + width &&
                    y + this.ball.radius > brick.y &&
                    y - this.ball.radius < brick.y + height && brick.status == 1) {
                    dy = -dy;
                    brick.status = 0;
                    this.score++;
                    if (this.score == cols * rows) {
                        setTimeout(()=>{
                            alert("YOU WIN, CONGRATULATIONS!");
                            document.location.reload();
                        }, 500);

                    }
                }

            }
        }
        return dy;
    }

    render() {

    }
}