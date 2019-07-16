
// const socket = io();

// var canWidth = 1400;
// var canHeight = 788

//the position where the frame will be drawn
// var x;
// var y;

// var trackLeft = 1;
// var trackRight = 0;

var WalkUpX;
var WalkUpY;

var WalkUpSheetWidth = 156;
var WalkUpSheetHeight = 64;

var WalkUpcols = 4;
var WalkUprows = 1;

var VertWidth = WalkUpSheetWidth / WalkUpcols;
var VertHeight = WalkUpSheetHeight / WalkUprows;

var WalkUpCF = 0;

const walkingUp = new Image();
walkingUp.src = "/client/images/player/XX/walking/player_walk_up.png"

// var canvas = document.getElementById('ctx')
// canvas.width = canWidth;
// canvas.height = canHeight;
// var ctx = canvas.getContext('2d');

var WalkUpCount = 0;
// this changes the speed of the animation
var WalkUpSpd = 10;

function updateWalkUp() {
  WalkUpCount += 1
  if (WalkUpCount % 8 === 0) {
    WalkUpCF = ++WalkUpCF % WalkUpcols;
  }
  // console.log(WalkUpCF)
  // }
  WalkUpX = WalkUpCF * VertWidth;
}
WalkUpY = 0

function drawWalkUp(x, y) {
  updateWalkUp();
  ctx.drawImage(walkingUp, WalkUpX, WalkUpY, VertWidth, VertHeight, x, y, VertWidth, VertHeight);
};
