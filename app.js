const Player = require('./player');
const Entity = require('./entity');
const Fire = require('./fire');
const Tree = require('./tree');


const express = require("express");
const app = express();
const server = require("http").Server(app);
// const http = require("http");
// const server = http.createServer(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 2000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

app.use("/client", express.static(__dirname + "/client"));
server.listen(port, () => console.log(`Listening on port ${port}`));




Tree.list = {};
Player.list = {};
const fire = new Fire(1, { x: 700, y: 350 }, null);


const socketList = {};

const entities = {
  player: Player.list,
  tree: Tree.list,
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
    if (data.inputId === "chop") player.pressingChop = data.state;
  });
}

Player.onDisconnect = socket => {
  delete Player.list[socket.id];
};

// on client "connection", do the following
io.on("connection", socket => {
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



// game.js?
// Ghost.spawnGhosts();

Tree.spawnTrees();

setInterval(() => {
  // pass entities to all?
  const pack = {


    player: Player.update(entities.trees),
    tree: Tree.update(),
    fire: fire.update()

  };


  for (let i in socketList) {
    const socket = socketList[i];
    socket.emit("pack", pack)

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

