
const path = require('path');
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 2000;
const socketList = {};

const Player = require('./player');
const Entity = require('./entity');
const Fire = require('./fire');
const Tree = require('./tree');
const Log = require('./items/log');
const Torch = require('./items/torch');
const Specter = require('./ghosts/specter');
const Stalker = require('./ghosts/stalker');

const fire = new Fire(1, { x: 700, y: 420 }, 30);
const spawner1 = new Specter(0, { x: 1, y: 375 }, 15);
const spawner2 = new Stalker(0, { x: 1, y: 1 }, 15);


if (process.env.NODE_ENV === 'production') {
  app.use("/client", express.static(__dirname + "/client"));
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
  });
}
  
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/start_page.html");
});

app.get("/game", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

  
app.use("/client", express.static(__dirname + "/client"));
server.listen(port, () => console.log(`Listening on port ${port}`));


spawner1.speed = 0;
spawner2.speed = 0;
Tree.list = {};
Player.list = {};


const entities = {

  player: Player.list,
  tree: Tree.list,
  fire: fire,
  specter: Specter.list,
  stalker: Stalker.list,
  torch: Torch.list,
  log: Log.list

  // ghosts: Ghost.list
} 
  
Player.onConnect = socket => {
  const pos = { x: 700, y: 300 };
  const size = 15;
  const player = new Player(socket.id, pos, size);
  Player.list[socket.id] = player;
  socket.on("keyPress", data => {
    if (data.inputId === "right") player.pressingRight = data.state; 
    if (data.inputId === "left") player.pressingLeft = data.state;
    if (data.inputId === "up") player.pressingUp = data.state;
    if (data.inputId === "down") player.pressingDown = data.state;
    if (data.inputId === "chop") player.pressingChop = data.state;
    if (data.inputId === "drop") player.pressingDrop = data.state;
  });
}

Player.onDisconnect = socket => {
  delete Player.list[socket.id];
};



// game.js?
// Ghost.spawnGhosts();

Tree.spawnTrees();


// on client "connection", do the following
io.on("connection", socket => {
  socket.id = Math.random();
  socketList[socket.id] = socket;

  let clients = io.engine.clientsCount;
  console.log(`Client connected: ${clients}`);

  if (clients > 2) {
    socket.disconnect(true);
  }

  Player.onConnect(socket);

  // server socket automatically listens for 'disconnect'
  socket.on("disconnect", () => {
    console.log(`Client disconnected`);

    delete socketList[socket.id];
    delete Player.list[socket.id];

    Player.onDisconnect(socket);
  });

  socket.on("sendMsgToServer", (data) => {
    let playerName = ("" + socket.id).slice(2, 7);
    for (let i in socketList) {
      socketList[i].emit("addToChat", playerName + ": " + data);
    }
  })
});


Tree.spawnTrees();

let count = 0

setInterval(() => {
  count++

  
  
  // pass entities to all?
  Specter.fire = fire;
  Specter.players = entities.player;
  Specter.torches = entities.torch;
  Specter.logs = entities.log;
  Stalker.players = entities.player;
  // console.log(entities.player);
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
    const socket = socketList[i];
    socket.emit("pack", pack)

    if (count === 180) {
      fire.dwindle();
      count = 0;
    }
  }

  spawner1.spawnSpecter();
  spawner2.spawnStalker();
}, 1000 / 60);

// Fire dwindles every 10 seconds
// If the fire burns out, stop dwindling and call gameOver for the whole game
let firePit = setInterval(() => {
  if(fire.gameOver) {
    null
    // game.gameOver();
  } else {
    fire.firePower--;
  }

}, 3000);