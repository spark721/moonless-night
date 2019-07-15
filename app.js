const Player = require('./player');
const Entity = require('./entity');
const Tree = require('./entity');

const express = require("express");
const app = express();
const serv = require("http").Server(app);
const io = require("socket.io")(serv, {});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

// express to pull client files?
app.use("/client", express.static(__dirname + "/client"));
serv.listen(2000);

Entity.list = {};
Tree.list = {};
Player.list = {};

const socketList = {};

Player.onConnect = socket => {
  const pos = { x: 700, y: 300 };
  const size = 10;
  const player = new Player(Object.keys(socketList).length, pos, size);
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

// spawn trees. how do we add/remove from entities list?
// player/tree interactions
// circular collision

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

    player.update();

    pack.push({
      x: player.x,
      y: player.y,
      id: player.id
    });
  }

  return pack;
}

// add to a spawn file
Tree.spawnTrees = () => {
  for (let i = 0; i < 10; i++) {
    let pos = { 
      x: Math.floor(Math.random() * 1400),
      y: Math.floor(Math.random() * 750),
    };

    let tree = new Tree(i, pos, 50)
    Tree.list[i] = tree;
  }
}

Tree.update = () => {
  const pack = [];

  for (let i in Tree.list) {
    const tree = Tree.list[i];
    
    tree.update();

    pack.push({
      x: tree.x,
      y: tree.y,
      id: tree.id
    })
  }

  return pack;
}

// render at 60fps via setInterval
// emits all updates for all players

Tree.spawnTrees();

setInterval(() => {
  const pack = {
    player: Player.update(),
    tree: Tree.update()
  }

  for (let i in socketList) {
    const socket = socketList[i];
    socket.emit("pack", pack)
  }

}, 1000 / 60);
