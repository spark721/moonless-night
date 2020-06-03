// const socket = io();

let high_canWidth = 1400;
let high_canHeight = 788

//the position where the frame will be drawn
let high_x = 570;
let high_y = 190;

let high_srcX;
let high_srcY;

let high_sheetWidth = 1792;
let high_sheetHeight = 512;

let high_cols = 7;
let high_rows = 2;

let high_width = high_sheetWidth / high_cols;
let high_height = high_sheetHeight / high_rows;

let high_currentFrame = 0;

const high_character = new Image();
high_character.src = "/client/images/fire/fire_high_sprites.png"

// let canvas = document.getElementById('ctx')
// canvas.width = canWidth;
// canvas.height = canHeight;
// let ctx = canvas.getContext('2d');

let high_i = 0;
let high_count = 0;
// this changes the speed of the animation
let high_spriteSpd = 5;

function high_updateFrame() {
    if (high_currentFrame < 7) {
        high_count++
        if (high_count % high_spriteSpd === 0) { high_currentFrame = ++high_currentFrame }
    } else {
        high_i += 1
        high_currentFrame = 0
        high_srcY = high_i * high_height;
    }

    if (high_currentFrame === 2 && high_srcY === 256) {
        high_currentFrame = 0
        high_srcY = 0
        high_i = 0
    }

    high_srcX = high_currentFrame * high_width;


    //this is the reason that other drawn images disappear behind the fire
    // ctx.clearRect(x,y, sdwidth, height);

}


// socket.on("pack", data => {
//   drawImage();
// })

function highFireDrawImage() {
    high_updateFrame();
    ctx.drawImage(high_character, high_srcX, high_srcY, high_width, high_height, high_x, high_y, high_width, high_height);
}


