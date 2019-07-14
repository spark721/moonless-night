const Player = require('./player');
const Entity = require('./entity');

const express = require("express");
const app = express();
const serv = require("http").Server(app);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

// express to pull client files?
app.use("/client", express.static(__dirname + "/client"));
serv.listen(2000);

Entity.list = {};
Player.list = {};

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

const socketList = {};

// render at 60fps via setInterval
// emits all updates for all players
setInterval(() => {

  const pack = Player.update();

  for (let i in socketList) {
    const socket = socketList[i];
    socket.emit("newPosition", pack)
  }
}, 1000 / 60);
