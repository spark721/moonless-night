// const socket = io();

let specter_canWidth = 1400;
let specter_canHeight = 788

//the position where the frame will be drawn
// let x = 650;
// let y = 240;

let specter_srcX;
let specter_srcY;

let specter_sheetWidth = 352;
let specter_sheetHeight = 32;

let specter_cols = 11;
let specter_rows = 1;

let specter_width = specter_sheetWidth / specter_cols;
let specter_height = specter_sheetHeight / specter_rows;

let specter_currentFrame = 0;

const specter_character = new Image();
specter_character.src = "client/images/specter/specter_sprite-sheet.png";

// let canvas = document.getElementById('ctx')
// canvas.width = canWidth;
// canvas.height = canHeight;
// let ctx = canvas.getContext('2d');

let specter_i = 0;
let specter_count = 0
// this changes the speed of the animation
let specter_spriteSpd = 20;

function specter_updateFrame() {
    // if (specter_currentFrame < 11) {
    specter_count++
    // console.log(specter_count);
    if (specter_count % specter_spriteSpd === 0) {
        specter_currentFrame += 1
        specter_currentFrame = specter_currentFrame % 11
    }
    // } 
    //     specter_i += 1
    //     specter_currentFrame = 0;
    //     specter_srcY = specter_i * specter_height;
    // }

    // if (specter_currentFrame === 11 && specter_srcY === 32) {
    //     specter_currentFrame = 0
    //     specter_srcY = 0
    //     specter_i = 0
    // }

    specter_srcX = specter_currentFrame * specter_width;
    specter_srcY = 0;
    //this is the reason that other drawn images disappear behind the fire
    // ctx.clearRect(x,y, sdwidth, height);
}


// socket.on("pack", data => {
//   drawImage();
// })

function specterDrawImage(specter_x, specter_y) {
    specter_updateFrame();
    ctx.drawImage(specter_character, specter_srcX, specter_srcY, specter_width, specter_height, specter_x, specter_y, specter_width, specter_height);
}
