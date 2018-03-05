/**
 * Created by bohdan on 23.02.2018.
 */

import Canvas from './canvas/Canvas'


document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    document.getElementsByTagName('body')[0].style.margin = '10%';
    document.getElementsByTagName('body')[0].style.padding = '0';
    const canvas = new Canvas({parent: root});
    document.addEventListener('keydown', (e)=>{
        canvas.paddle.keyDownHandler(e.keyCode);
    });
    document.addEventListener('keyup', (e)=>{
        canvas.paddle.keyUpHandler(e.keyCode);
    });
    canvas.loop();
});