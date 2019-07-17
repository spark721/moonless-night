// const socket = io();

var very_canWidth = 1400;
var very_canHeight = 788

//the position where the frame will be drawn
var very_x = 570;
var very_y = 190;

var very_srcX;
var very_srcY;

var very_sheetWidth = 2048;
var very_sheetHeight = 768;

var very_cols = 8;
var very_rows = 3;

var very_width = very_sheetWidth / very_cols;
var very_height = very_sheetHeight / very_rows;

var very_currentFrame = 0;

const very_character = new Image();
very_character.src = "/client/images/fire/fire_very_low_sprites.png"

// var canvas = document.getElementById('ctx')
// canvas.width = canWidth;
// canvas.height = canHeight;
// var ctx = canvas.getContext('2d');

var very_i = 0;
var very_count = 0;
// this changes the speed of the animation
var very_spriteSpd = 5;

function very_updateFrame() {
    if (very_currentFrame < 8) {
        very_count++
        if (very_count % very_spriteSpd === 0) { very_currentFrame = ++very_currentFrame }
    } else {
        very_i += 1
        very_currentFrame = 0
        very_srcY = very_i * very_height;
    }

    if (very_currentFrame === 3 && very_srcY === 512) {
        very_currentFrame = 0
        very_srcY = 0
        very_i = 0
    }

    very_srcX = very_currentFrame * very_width;


    //this is the reason that other drawn images disappear behind the fire
    // ctx.clearRect(x,y, sdwidth, height);

}


// socket.on("pack", data => {
//   drawImage();
// })

function veryLowFireDrawImage() {
    very_updateFrame();
    ctx.drawImage(very_character, very_srcX, very_srcY, very_width, very_height, very_x, very_y, very_width, very_height);
}


