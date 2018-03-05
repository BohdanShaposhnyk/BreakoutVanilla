/**
 * Created by bohdan on 05.03.2018.
 */




export const canvasSize = {
    width: 480,
    height: 320
};

export const canvasStyle = {
    backgroundColor: '#eee',
    display: 'block',
    margin: '0 auto'
};

export const bricksFeatures = {
    rows : 3,
    cols : 5,
    width : 75,
    height : 20,
    padding : 10,
    offsetTop : 30,
    offsetLeft : 30
};

let bricks = [];
for ( let col = 0; col < bricksFeatures.cols; col++) {
    bricks[col] = [];
    for ( let row = 0; row < bricksFeatures.rows; row++) {
        bricks[col][row] = { x: 0, y: 0, status: 1 };
    }
}

export { bricks };