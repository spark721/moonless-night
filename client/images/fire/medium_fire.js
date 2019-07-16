
// const socket = io();

var canWidth = 1400;
var canHeight = 788

//the position where the frame will be drawn
var x = 650;
var y = 240;

var srcX;
var srcY;

var sheetWidth = 1020;
var sheetHeight = 1435;

var cols = 10;
var rows = 7;

var width = sheetWidth / cols;
var height = sheetHeight / rows;

var currentFrame = 0;

const character = new Image();
character.src = "/client/images/fire/fire_medium_sprites.png"

// var canvas = document.getElementById('ctx')
// canvas.width = canWidth;
// canvas.height = canHeight;
// var ctx = canvas.getContext('2d');

var i = 0;
var count = 0
// this changes the speed of the animation
var spriteSpd = 10

function updateFrame() {
  if (currentFrame < 8 ){
    count++
    if(count % spriteSpd === 0) {currentFrame = ++currentFrame}
  }  else {
    i += 1
    currentFrame = 0
    srcY = i * height;
  }

  if (currentFrame === 4 && srcY === 1230) {
    currentFrame = 0
    srcY = 0
    i = 0
  }
  
  srcX = currentFrame * width;

  ctx.clearRect(x,y, width, height);
}


// socket.on("pack", data => {
//   drawImage();
// })

function medFireDrawImage() {
  updateFrame();
  ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height);
}


