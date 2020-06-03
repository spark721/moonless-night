
// const socket = io();

// var canWidth = 1400;
// var canHeight = 788

//the position where the frame will be drawn
// var x;
// var y;

// var trackLeft = 1;
// var trackRight = 0;

var PlayerIdleX;
var PlayerIdleY;

var PlayerIdleSheetWidth = 77;
var PlayerIdleSheetHeight = 64;

var PlayerIdlecols = 2;
var PlayerIdlerows = 1;

var PlayerIdleWidth = PlayerIdleSheetWidth / PlayerIdlecols;
var PlayerIdleHeight = PlayerIdleSheetHeight / PlayerIdlerows;

var PlayerIdleCF = 0;

const playerIdle = new Image();
playerIdle.src = "/client/images/player/XX/idle/player_idle.png"

// var canvas = document.getElementById('ctx')
// canvas.width = canWidth;
// canvas.height = canHeight;
// var ctx = canvas.getContext('2d');

var PlayerIdleCount = 0;
// this changes the speed of the animation
var PlayerIdleSpd = 30;

function updatePlayerIdle() {
  PlayerIdleCount += 1
  if (PlayerIdleCount % PlayerIdleSpd === 0) {
    PlayerIdleCF = ++PlayerIdleCF % PlayerIdlecols;
  }
  PlayerIdleX = PlayerIdleCF * PlayerIdleWidth;
}
PlayerIdleY = 0

function drawPlayerIdle(x, y) {
  updatePlayerIdle();
  ctx.drawImage(playerIdle, PlayerIdleX, PlayerIdleY, PlayerIdleWidth, PlayerIdleHeight, x, y, PlayerIdleWidth, PlayerIdleHeight);
};
