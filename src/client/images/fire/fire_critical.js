// const socket = io();

let critical_canWidth = 1400;
let critical_canHeight = 788

//the position where the frame will be drawn
let critical_x = 570;
let critical_y = 190;

let critical_srcX;
let critical_srcY;

let critical_sheetWidth = 2048;
let critical_sheetHeight = 1024;

let critical_cols = 8;
let critical_rows = 4;

let critical_width = critical_sheetWidth / critical_cols;
let critical_height = critical_sheetHeight / critical_rows;

let critical_currentFrame = 0;

const critical_character = new Image();
critical_character.src = "/client/images/fire/fire_critical_sprites.png"

// let canvas = document.getElementById('ctx')
// canvas.width = canWidth;
// canvas.height = canHeight;
// let ctx = canvas.getContext('2d');

let critical_i = 0;
let critical_count = 0;
// this changes the speed of the animation
let critical_spriteSpd = 5;

function critical_updateFrame() {
    if (critical_currentFrame < 8) {
        critical_count++
        if (critical_count % critical_spriteSpd === 0) { critical_currentFrame = ++critical_currentFrame }
    } else {
        critical_i += 1
        critical_currentFrame = 0
        critical_srcY = critical_i * critical_height;
    }

    if (critical_currentFrame === 4 && critical_srcY === 768) {
        critical_currentFrame = 0
        critical_srcY = 0
        critical_i = 0
    }

    critical_srcX = critical_currentFrame * critical_width;


    //this is the reason that other drawn images disappear behind the fire
    // ctx.clearRect(x,y, sdwidth, height);

}


// socket.on("pack", data => {
//   drawImage();
// })

function criticalFireDrawImage() {
    critical_updateFrame();
    ctx.drawImage(critical_character, critical_srcX, critical_srcY, critical_width, critical_height, critical_x, critical_y, critical_width, critical_height);
}


