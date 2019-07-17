const Entity = require("./entity");
const Torch = require('./items/torch');
const Log = require('./items/log');

class Player extends Entity {
  constructor(id, pos, size) {
    super(id, pos, size);
    this.state = "NEUTRAL";
    this.speed = 2;
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.pressingChop = false;
    this.pressingDrop = false;
    this.pressingHeal = false;
    this.tree = undefined;
    this.fire = undefined;
    this.log = undefined;
    this.torch = undefined;
    this.player = undefined;
    this.specter = undefined;
    this.stalker = undefined;
    this.spawned = 0;
  }

  static update(entities) {
    const pack = [];

    for (let i in Player.list) {
      let player = Player.list[i];
      if (player.state !== "FETAL") player.update(entities);
      pack.push(player);
    }

    return pack;
  }

  update(entities) {
    if (this.specter || this.stalker) {
      this.state = "FETAL";
    }

    if (entities) this.updateNearestObjects(entities);
    this.updatePosition(entities);
    this.chop();
    this.drop();

<<<<<<< HEAD
=======
    // console.log(this.pressingChop);
>>>>>>> dacea354b19e73616813b0c4ec0f603a4a97dc4f
    if (
      this.distance(this.fire) < 120 &&
      this.state === "NEUTRAL" &&
      this.pressingChop
    ) {
      this.state = "TORCH";
<<<<<<< HEAD
    }
    if (this.state === "NEUTRAL" && this.log && this.pressingChop) {
      Log.delete(this.log.id);
      this.state = "LOGS";
    }
    if (this.state === "NEUTRAL" && this.torch && this.pressingChop) {
=======
    } else if (this.state === "NEUTRAL" && this.log && this.pressingChop) {
      Log.delete(this.log.id);
      this.state = "LOGS";
    } else if (this.state === "NEUTRAL" && this.torch && this.pressingChop) {
>>>>>>> dacea354b19e73616813b0c4ec0f603a4a97dc4f
      Torch.delete(this.torch.id);
      this.state = "TORCH";
    }
    if (this.pressingHeal && this.player) {
      entities.player[this.player].getHealed();
    }
  }

  updateNearestObjects(entities) {
    this.fire = entities.fire;
    const trees = Object.values(entities.tree);
    const sortedTrees = trees.sort((a, b) => {
      return this.distance(a) - this.distance(b);
    });

    const closestTree = sortedTrees.filter(tree => tree.logs > 0)[0];

    if (this.distance(closestTree) < 70) {
      this.tree = closestTree;
    } else {
      this.tree = undefined;
    }
    ////////////////////////////////////////////////////////////////
    const logs = Object.values(entities.log);
    const sortedLogs = logs.sort((a, b) => {
      return this.distance(a) - this.distance(b);
    });

    const closestLog = sortedLogs[0];

    if (this.distance(closestLog) < 70) {
      
      this.log = closestLog;
    } else {
      this.log = undefined;
    }
    ////////////////////////////////////////////////////////////////
    const specters = Object.values(entities.specter);
    const sortedSpecters = specters.sort((a, b) => {
      return this.distance(a) - this.distance(b);
    });

    const closestSpecter = sortedSpecters[0];

    if (this.distance(closestSpecter) < 40) {
      this.specter = closestSpecter;
    } else {
      this.specter = undefined;
    }    
    ////////////////////////////////////////////////////////////////
    const stalkers = Object.values(entities.stalker);
    const sortedStalkers = stalkers.sort((a, b) => {
      return this.distance(a) - this.distance(b);
    });
    
    const closestStalker = sortedStalkers[0];

    if (
      this.distance(closestStalker) > 0 &&
      this.distance(closestStalker) < 40
    ) {
      this.stalker = true;
    } else {
      this.stalker = undefined;
    }    
    ////////////////////////////////////////////////////////////////
    const players = Object.values(entities.player).filter(player => player.id !== this.id);
    const sortedPlayers = players.sort((a, b) => {
      return this.distance(a) - this.distance(b);
    });

    const closestPlayer = sortedPlayers[0];

    if (closestPlayer === undefined) {
      return;
    } else if (this.distance(closestPlayer) < 70) {
      this.player = closestPlayer.id;
    } else {
      this.player = undefined;
    }    
    ////////////////////////////////////////////////////////////////
    const torches = Object.values(entities.torch);
    const sortedTorches = torches.sort((a, b) => {
      return this.distance(a) - this.distance(b);
    });

    const closestTorch = sortedTorches[0];

    if (this.distance(closestTorch) < 70) {
      this.torch = closestTorch;
    } else {
      this.torch = undefined;
    }
  }
  
  updatePosition(entities) {
    const trees = Object.values(entities.tree);

    const tempPos = { x: this.x, y: this.y };

    if (this.pressingRight) tempPos.x += this.speed;
    if (this.pressingLeft) tempPos.x -= this.speed;
    if (this.pressingDown) tempPos.y += this.speed;
    if (this.pressingUp) tempPos.y -= this.speed;

    if (
      !this.playerTreeCollision(tempPos, trees) &&
      !this.playerFireCollision(tempPos, this.fire)
    ) {
      this.x = tempPos.x;
      this.y = tempPos.y;
    }

    if (
      this.pressingChop &&
      this.distance(this.fire) < 110 &&
      this.state === "LOGS"
    ) {
      this.fire.eatLogs();
      this.state = "NEUTRAL";
    }
    if (
      this.pressingChop &&
      this.distance(this.fire) < 110 &&
      this.state === "TORCH"
    ) {
      // this.fire.eatLogs();
      this.state = "NEUTRAL";
    }
    if (
      this.distance(this.fire) < 120 &&
      this.state === "NEUTRAL" &&
      this.pressingChop
    ) {
      this.state = "TORCH";
    }
    if (this.state === "NEUTRAL" && this.log && this.pressingChop) {
      Log.delete(this.log.id);
      this.state = "LOGS";
    }
    if (this.state === "NEUTRAL" && this.torch && this.pressingChop) {
      Torch.delete(this.torch.id);
      this.state = "TORCH";
    }
    if (this.pressingHeal && this.player) {
      entities.player[this.player].getHealed();
    }
  }

  getHealed() {
    this.state = "NEUTRAL";
  }

  distance(object) {
    if (object === undefined) return 0;
    const dx = this.x - object.x;
    const dy = this.y - object.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  chop() {
    if (this.state === "NEUTRAL" && this.tree && this.pressingChop) {
      this.tree.chopped();
      this.state = "LOGS";
    }
  }

  drop() {
    if (this.pressingDrop) {
      if (this.state === "TORCH") {
        this.state = "NEUTRAL";
        let torch = new Torch(this.spawned, { x: this.x, y: this.y }, 15);
        Torch.list[this.spawned] = torch;
        this.spawned++;
      } else if (this.state === "LOGS") {
        this.state = "NEUTRAL";
        let log = new Log(this.spawned, { x: this.x, y: this.y }, 15);
        Log.list[this.spawned] = log;
        this.spawned++;
      }
    }
  }

  playerTreeCollision(tempPos, treeList) {
    return Object.values(treeList).some(tree => {
      if (tree.logs === 0) return false;
      const dx = tempPos.x - tree.x;
      const dy = tempPos.y - tree.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + tree.size) {
        return true;
      }
    });
  }

  playerFireCollision(tempPos, fire) {
    const dx = tempPos.x - fire.x;
    const dy = tempPos.y - fire.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.size + fire.size) {
      return true;
    }
  }
};

Player.list = {};

// change to webpack?
module.exports = Player;