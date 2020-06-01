
// const socket = io();

// var canWidth = 1400;
// var canHeight = 788

//the position where the frame will be drawn
// var x;
// var y;

// var trackLeft = 1;
// var trackRight = 0;

var FetalX;
var FetalY;

var FetalSheetWidth = 36;
var FetalSheetHeight = 260;

var Fetalcols = 1;
var Fetalrows = 4;

var FetalWidth = FetalSheetWidth / Fetalcols;
var FetalHeight = FetalSheetHeight / Fetalrows;

var FetalCF = 0;

const Fetal = new Image();
Fetal.src = "/client/images/player/XX/fetal/player_fetal.png"

// var canvas = document.getElementById('ctx')
// canvas.width = canWidth;
// canvas.height = canHeight;
// var ctx = canvas.getContext('2d');

var FetalCount = 0;
// this changes the speed of the animation
var FetalSpd = 30;

function updateFetal() {
  FetalCount += 1
  if (FetalCount % 8 === 0) {
    FetalCF = ++FetalCF % Fetalrows;
  }
  FetalY = FetalCF * FetalHeight;
  FetalX = 0
}

function drawFetal(x, y) {
  updateFetal();
  ctx.drawImage(Fetal, FetalX, FetalY, FetalWidth, FetalHeight, x, y, FetalWidth, FetalHeight);
};
