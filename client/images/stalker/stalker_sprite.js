
// const socket = io();

let stalker_canWidth = 1400;
let stalker_canHeight = 788

//the position where the frame will be drawn
// let x = 650;
// let y = 240;

let stalker_srcX;
let stalker_srcY;

let stalker_sheetWidth = 543;
let stalker_sheetHeight = 240;

let stalker_cols = 9;
let stalker_rows = 4;

let stalker_width = stalker_sheetWidth / stalker_cols;
let stalker_height = stalker_sheetHeight / stalker_rows;

let stalker_currentFrame = 0;

const stalker_character = new Image();
stalker_character.src = "client/images/stalker/SeekPng.com_sprite-sheet-png_2302937.png";

// let canvas = document.getElementById('ctx')
// canvas.width = canWidth;
// canvas.height = canHeight;
// let ctx = canvas.getContext('2d');

let stalker_i = 0;
let stalker_count = 0
// this changes the speed of the animation
let stalker_spriteSpd = 10

function stalker_updateFrame() {
    if (stalker_currentFrame < 8) {
        stalker_count++
        if (stalker_count % stalker_spriteSpd === 0) { stalker_currentFrame = ++stalker_currentFrame }
    } else {
        i += 1
        stalker_currentFrame = 0;
        stalker_srcY = stalker_i * stalker_height;
    }

    if (stalker_currentFrame === 8 && stalker_srcY === 180) {
        stalker_currentFrame = 0
        stalker_srcY = 0
        stalker_i = 0
    }

    stalker_srcX = stalker_currentFrame * stalker_width;

    //this is the reason that other drawn images disappear behind the fire
    // ctx.clearRect(x,y, sdwidth, height);
}


// socket.on("pack", data => {
//   drawImage();
// })

function stalkerDrawImage(stalker_x, stalker_y) {
    stalker_updateFrame();
    ctx.drawImage(stalker_character, stalker_srcX, stalker_srcY, stalker_width, stalker_height, stalker_x, stalker_y, stalker_width, stalker_height);
}
