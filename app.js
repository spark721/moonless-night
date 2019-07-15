const Player = require('./player');
const Tree = require('./tree');

const express = require("express");
const app = express();
// const serv = require("http").Server(app);
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {});

const port = process.env.PORT || 2000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

// express to pull client files?
// app.use("/client", express.static(__dirname + "/client"));
server.listen(port, () => console.log(`Listening on port ${port}`));

Tree.list = {};
Player.list = {};

const socketList = {};

const playerTreeCollision = (pos, size) => {
  return Object.values(Tree.list).some(tree => {
    const dx = pos.x - tree.x;
    const dy = pos.y - tree.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < size + tree.size) {
      return true;
    }
  });
};

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

// spawn trees. how do we add/remove from entities list?
// player/tree interactions
// circular collision

// on client "connection", do the following
io.sockets.on("connection", socket => {
  socket.id = Math.random();
  socketList[socket.id] = socket;

  console.log(`Client connected`);

  Player.onConnect(socket);

  // server socket automatically listens for 'disconnect'
  socket.on("disconnect", () => {
    console.log(`Client disconnected`);

    delete socketList[socket.id];
    Player.onDisconnect(socket);
  });
});

// handles all updates for all players
// returns pack of all updates as array
// make .update for all classes

Player.update = () => {
  const pack = [];

  for (let i in Player.list) {
    let player = Player.list[i];

    let newX = player.x;
    let newY = player.y;

    if (player.pressingRight) newX += player.speed;
    if (player.pressingLeft) newX -= player.speed;
    if (player.pressingUp) newY -= player.speed;
    if (player.pressingDown) newY += player.speed;

    // if new position doesn't cause collision, update player
    if (!playerTreeCollision({ x: newX, y: newY}, player.size)) {
      player.update();
    }
    
    // player.update();
    pack.push(player);
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

    let tree = new Tree(i, pos, 25);
    Tree.list[i] = tree;
  }
}

Tree.update = () => {
  const pack = [];

  for (let i in Tree.list) {
    const tree = Tree.list[i];
    tree.update();
    pack.push(tree)
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
