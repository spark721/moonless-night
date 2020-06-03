// const socket = io();

let low_canWidth = 1400;
let low_canHeight = 788

//the position where the frame will be drawn
let low_x = 570;
let low_y = 190;

let low_srcX;
let low_srcY;

let low_sheetWidth = 2048;
let low_sheetHeight = 1280;

let low_cols = 8;
let low_rows = 5;

let low_width = low_sheetWidth / low_cols;
let low_height = low_sheetHeight / low_rows;

let low_currentFrame = 0;

const low_character = new Image();
low_character.src = "/client/images/fire/fire_low_sprites.png"

// let canvas = document.getElementById('ctx')
// canvas.width = canWidth;
// canvas.height = canHeight;
// let ctx = canvas.getContext('2d');

let low_i = 0;
let low_count = 0;
// this changes the speed of the animation
let low_spriteSpd = 5;

function low_updateFrame() {
    if (low_currentFrame < 8) {
        low_count++
        if (low_count % low_spriteSpd === 0) { low_currentFrame = ++low_currentFrame }
    } else {
        low_i += 1
        low_currentFrame = 0
        low_srcY = low_i * low_height;
    }

    if (low_currentFrame === 5 && low_srcY === 1024) {
        low_currentFrame = 0
        low_srcY = 0
        low_i = 0
    }

    low_srcX = low_currentFrame * low_width;


    //this is the reason that other drawn images disappear behind the fire
    // ctx.clearRect(x,y, sdwidth, height);

}


// socket.on("pack", data => {
//   drawImage();
// })

function lowFireDrawImage() {
    low_updateFrame();
    ctx.drawImage(low_character, low_srcX, low_srcY, low_width, low_height, low_x, low_y, low_width, low_height);
}


