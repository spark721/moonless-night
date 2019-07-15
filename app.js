const Player = require('./player');
const Entity = require('./entity');
const Fire = require('./fire');

const express = require("express");
const app = express();
const serv = require("http").Server(app);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

// express to pull client files?
app.use("/client", express.static(__dirname + "/client"));
serv.listen(2000);

Player.list = {};
const fire = new Fire(1, { x: 700, y: 350 }, null);

Player.onConnect = socket => {
  const player = new Player(Object.keys(socketList).length);
  Player.list[socket.id] = player;
  socket.on("keyPress", data => {
    if (data.inputId === "right") player.pressingRight = data.state;
    if (data.inputId === "left") player.pressingLeft = data.state;
    if (data.inputId === "up") player.pressingUp = data.state;
    if (data.inputId === "down") player.pressingDown = data.state;
  });
}

Player.onDisconnect = socket => {
  delete Player.list[socket.id];
}

const io = require("socket.io")(serv, {});

// on client "connection", do the following
io.sockets.on("connection", socket => {
  socket.id = Math.random();
  socketList[socket.id] = socket;
  
  Player.onConnect(socket);

  // server socket automatically listens for 'disconnect'
  socket.on("disconnect", () => {
    delete socketList[socket.id];
    Player.onDisconnect(socket);
  });
});

// handles all updates for all players
// returns pack of all updates as array

Player.update = () => {
  const pack = [];

  for (let i in Player.list) {
    const player = Player.list[i];

    player.updatePosition();

    pack.push({
      x: player.x,
      y: player.y,
      id: player.id
    });
  }

  return pack;
}

// handles updating fire's state changes. Will pass STATE later.
  fire.update = () => {
    let pack = {
      x: fire.x,
      y: fire.y,
      radius: fire.radius
    }
    return pack;
  }

const socketList = {};

// render at 60fps via setInterval
// emits all updates for all players
setInterval(() => {

  const pack = ({
    player: Player.update(),
    fire: fire.update()
  })
  
  for (let i in socketList) {
    const socket = socketList[i];
    socket.emit("pack", pack);
  }
}, 1000 / 60);




// Fire dwindles every 10 seconds
// If the fire burns out, stop dwindling and call gameOver for the whole game
let firePit = setInterval(() => {
  if(fire.gameOver) {
    null
    // game.gameOver();
  } else {
    fire.dwindle();
  }

}, 3000);

