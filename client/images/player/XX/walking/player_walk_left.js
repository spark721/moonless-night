
// const socket = io();

// var canWidth = 1400;
// var canHeight = 788

//the position where the frame will be drawn
// var x;
// var y;

// var trackLeft = 1;
// var trackRight = 0;

var walkLeftX;
var walkLeftY;

var walkLeftSheetWidth = 144;
var walkLeftSheetHeight = 64;

var walkLeftcols = 4;
var walkLeftrows = 1;

var cfWidth = walkLeftSheetWidth / walkLeftcols;
var cfHeight = walkLeftSheetHeight / walkLeftrows;

var walkLeftCF = 0;

const walkingLeft = new Image();
walkingLeft.src = "/client/images/player/XX/walking/player_walk_left.png"

// var canvas = document.getElementById('ctx')
// canvas.width = canWidth;
// canvas.height = canHeight;
// var ctx = canvas.getContext('2d');

var walkLeftCount = 0;
// this changes the speed of the animation
var walkLeftSpd = 10;

function updateWalkLeft() {
  walkLeftCount += 1
  if (walkLeftCount % 8 === 0) {
    walkLeftCF = ++walkLeftCF % walkLeftcols;
  }
  // console.log(walkLeftCF)
  // }
  walkLeftX = walkLeftCF * cfWidth;
}
walkLeftY = 0

function drawWalkLeft(x, y) {
  updateWalkLeft();
  ctx.drawImage(walkingLeft, walkLeftX, walkLeftY, cfWidth, cfHeight, x, y, cfWidth, cfHeight);
};
