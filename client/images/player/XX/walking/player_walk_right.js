
// const socket = io();

// var canWidth = 1400;
// var canHeight = 788

//the position where the frame will be drawn
// var x;
// var y;

// var trackLeft = 1;
// var trackRight = 0;

var walkRightX;
var walkRightY;

var walkRightSheetWidth = 144;
var walkRightSheetHeight = 64;

var walkRightcols = 4;
var walkRightrows = 1;

var walkRight_cfWidth = walkRightSheetWidth / walkRightcols;
var walkRight_cfHeight = walkRightSheetHeight / walkRightrows;

var walkRightCF = 0;

const walkingRight = new Image();
walkingRight.src = "/client/images/player/XX/walking/player_walk_right.png"

// var canvas = document.getElementById('ctx')
// canvas.width = canWidth;
// canvas.height = canHeight;
// var ctx = canvas.getContext('2d');

var walkRightCount = 0;
// this changes the speed of the animation
var walkRightSpd = 10;

function updateWalkRight() {
  walkRightCount += 1
  if(walkRightCount % 8 === 0){
    walkRightCF = ++walkRightCF % walkRightcols;
  }
    // console.log(walkRightCF)
  // }
  walkRightX = walkRightCF * cfWidth;
}
walkRightY = 0

function drawWalkRight(x, y) {
  updateWalkRight();
  ctx.drawImage(walkingRight, walkRightX, walkRightY, cfWidth, cfHeight, x, y, cfWidth, cfHeight);
};
