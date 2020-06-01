
// const socket = io();

// var canWidth = 1400;
// var canHeight = 788

//the position where the frame will be drawn
// var x;
// var y;

// var trackLeft = 1;
// var trackRight = 0;

var WalkDownX;
var WalkDownY;

var WalkDownSheetWidth = 144;
var WalkDownSheetHeight = 64;

var WalkDowncols = 4;
var WalkDownrows = 1;

var WalkDownWidth = WalkDownSheetWidth / WalkDowncols;
var WalkDownHeight = WalkDownSheetHeight / WalkDownrows;

var WalkDownCF = 0;

const walkingDown = new Image();
walkingDown.src = "/client/images/player/XX/walking/player_walk_down.png"

// var canvas = document.getElementById('ctx')
// canvas.width = canWidth;
// canvas.height = canHeight;
// var ctx = canvas.getContext('2d');

var WalkDownCount = 0;
// this changes the speed of the animation
var WalkDownSpd = 10;

function updateWalkDown() {
  WalkDownCount += 1
  if (WalkDownCount % 8 === 0) {
    WalkDownCF = ++WalkDownCF % WalkDowncols;
  }
  // console.log(WalkDownCF)
  // }
  WalkDownX = WalkDownCF * WalkDownWidth;
}
WalkDownY = 0

function drawWalkDown(x, y) {
  updateWalkDown();
  ctx.drawImage(walkingDown, WalkDownX, WalkDownY, WalkDownWidth, WalkDownHeight, x, y, WalkDownWidth, WalkDownHeight);
};
