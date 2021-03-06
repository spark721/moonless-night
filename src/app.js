
const path = require('path');
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 2000;
const socketList = {};

import Player from './player';
import Fire from './fire';
import Tree from './tree';
import Log from './items/log'
import Torch from './items/torch';
import Specter from './ghosts/specter';
import Stalker from './ghosts/stalker'


let fire = new Fire(1, { x: 700, y: 420 }, 30);
const spawner1 = new Specter(0, { x: 1, y: 375 }, 15);
const spawner2 = new Stalker(0, { x: 1, y: 1 }, 15);


if (process.env.NODE_ENV === 'production') {
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/start_page.html");
  });

  app.get("/game", (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
  });

  app.use("/client", express.static(__dirname + "/client"));
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/start_page.html");
});

app.get("/game", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

app.use("/client", express.static(__dirname + "/client"));
server.listen(port);


spawner1.speed = 0;
spawner2.speed = 0;
Tree.list = {};

let entities = {
  player: Player.list,
  tree: Tree.list,
  fire: fire,
  specter: Specter.list,
  stalker: Stalker.list,
  torch: Torch.list,
  log: Log.list
} 

Player.onConnect = socket => {
  const pos = { x: 700, y: 300 };
  const size = 15;
  const player = new Player(socket.id, pos, size);
  // if (Object.keys(Player.list).length === 0){
  //   fire.resetFire();
  // }
  Player.list[socket.id] = player;
  socket.on("keyPress", data => {
    if (data.inputId === "right") player.pressingRight = data.state; 
    if (data.inputId === "left") player.pressingLeft = data.state;
    if (data.inputId === "up") player.pressingUp = data.state;
    if (data.inputId === "down") player.pressingDown = data.state;
    if (data.inputId === "chop") player.pressingChop = data.state;
    if (data.inputId === "drop") player.pressingDrop = data.state;
    if (data.inputId === "heal") player.pressingHeal = data.state;
    if (data.inputId === "right" && data.inputId === "left") {
      player.pressingRight = false;
      player.pressingLeft = false;
    }
  });
}

Player.onDisconnect = socket => {
  delete Player.list[socket.id];
};

// on client "connection", do the following
io.on("connection", socket => {
  socket.join('global');
  socket.id = Math.random();
  socketList[socket.id] = socket;

  let clients = io.engine.clientsCount;

  if (clients > 2) {
    socket.disconnect(true);
  }

  Player.onConnect(socket);

  // server socket automatically listens for 'disconnect'
  socket.on("disconnect", () => {

    delete socketList[socket.id];

    Player.onDisconnect(socket);
  });

  socket.on("sendMsgToServer", (data) => {
    let playerName = ("" + socket.id).slice(2, 7);
    for (let i in socketList) {
      socketList[i].emit("addToChat", playerName + ": " + data);
    }
  })
});



Tree.spawnTree();


let count = 0

function resetGame() {
  fire.firePower = 25;
  fire.gameOver = false;
  count = 0;
  Tree.list = {};
  Tree.spawnTree();
  entities.tree = Tree.list;
  spawner1.cdMax = 800;
  spawner2.cdMax = 2400;
  Torch.list = {};
  entities.torch = Torch.list;
  Log.list = {};
  entities.log = Log.list;
}

setInterval(() => {
  count++

  // pass entities to all?
  Specter.fire = fire;
  Specter.count = count;
  Specter.players = entities.player;
  Specter.torches = entities.torch;
  Specter.logs = entities.log;
  Stalker.players = entities.player;
  Stalker.count = count;

  const pack = {
    player: Player.update(entities),
    tree: Tree.update(),
    fire: fire.update(),
    specter: Specter.update(),
    stalker: Stalker.update(),
    log: Log.update(),
    torch: Torch.update()
  };

  for (let i in socketList) {
    io.to('global').emit("pack", pack);

    if (count % 120 === 0) {
      fire.dwindle();

      if (fire.gameOver) {
        io.emit("over");
        resetGame();
      }
    }

    let playerArray = Object.values(Player.list);
    if (playerArray.every(player => {return player.state === "FETAL";})){
      io.emit("over");
      resetGame();
    }

    if (count > 5400){
      io.emit("win");
      resetGame();
    }
  }

  spawner1.spawnSpecter();
  spawner2.spawnStalker();

}, 1000 / 60);
