const Player = require('./player');
const Tree = require('./tree');

const express = require("express");
const app = express();
const serv = require("http").Server(app);
const io = require("socket.io")(serv, {});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

app.use("/client", express.static(__dirname + "/client"));
serv.listen(2000);

const socketList = {};

const entities = {
  players: Player.list,
  trees: Tree.list,
  // ghosts: Ghost.list
} 

Player.onConnect = socket => {
  const id = Object.keys(socketList).length;
  const pos = { x: 700, y: 300 };
  const size = 10;
  const player = new Player(id, pos, size);
  Player.list[id] = player;
  socket.on("keyPress", data => {
    if (data.inputId === "right") player.pressingRight = data.state;
    if (data.inputId === "left") player.pressingLeft = data.state;
    if (data.inputId === "up") player.pressingUp = data.state;
    if (data.inputId === "down") player.pressingDown = data.state;
  });
}

Player.onDisconnect = socket => {
  delete Player.list[socket.id];
};

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

// game.js?
// Ghost.spawnGhosts();
Tree.spawnTrees();

setInterval(() => {
  // pass entities to all?
  const pack = {
    player: Player.update(entities.trees),
    tree: Tree.update()
  };

  for (let i in socketList) {
    const socket = socketList[i];
    socket.emit("pack", pack)
  }

}, 1000 / 60);
