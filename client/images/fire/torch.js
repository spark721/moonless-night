
// const socket = io();

var lowFire_canWidth = 1400;
var lowFire_canHeight = 788

//the position where the frame will be drawn
var lowFire_x;
var lowFire_y;

var lowFire_srcX;
var lowFire_srcY;

var lowFire_sheetWidth = 1000;
var lowFire_sheetHeight = 750;

var lowFire_lastIndex = (lowFire_sheetHeight - (lowFire_sheetHeight / 5))

var lowFire_cols = 8;
var lowFire_rows = 6;

var lowFire_width = lowFire_sheetWidth / lowFire_cols;
var lowFire_height = lowFire_sheetHeight / lowFire_rows;

var lowFire_currentFrame = 0;

const lowFire_character = new Image();
lowFire_character.src = "/client/images/fire/torch.png"

// var lowFire_canvas = document.getElementById('ctx')
// canvas.lowFire_width = canWidth;
// canvas.height = canHeight;
// var lowFire_ctx = canvas.getContext('2d');

var lowFire_i = 0;
var lowFire_count = 0;
// this changes the speed of the animation
var lowFire_spriteSpd = 6;

function lowFire_updateFrame() {
<<<<<<< HEAD
  // console.log(lowFire_srcY);
=======
>>>>>>> master
  if (lowFire_currentFrame < 8) {
    lowFire_count++
    if (lowFire_count % lowFire_spriteSpd === 0) { lowFire_currentFrame = ++lowFire_currentFrame }
  } else {
    lowFire_i += 1
    lowFire_currentFrame = 0
    lowFire_srcY = lowFire_i * lowFire_height;
  }

  if (lowFire_currentFrame === 5 && lowFire_srcY === 625) {
    lowFire_currentFrame = 0
    lowFire_srcY = 0
    lowFire_i = 0
  }

  lowFire_srcX = lowFire_currentFrame * lowFire_width;


  //this is the reason that other drawn images disappear behind the fire
  // ctx.clearRect(x,y, sdwidth, lowFire_height);

}


// socket.on("pack", data => {
//   drawImage();
// })

function lowFireDraw(x, y) {
  lowFire_updateFrame();
  ctx.drawImage(lowFire_character, lowFire_srcX, lowFire_srcY, lowFire_width, lowFire_height, x, y, lowFire_width, lowFire_height);
}


