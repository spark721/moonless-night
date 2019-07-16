const Entity = require("./entity");

class Player extends Entity {

  constructor(id, pos, size) {
    super(id, pos, size);
    this.state = "NEUTRAL";
    this.speed = 3;
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.pressingChop = false;
    this.tree = undefined;
    this.fire = undefined;
    this.player = undefined;
    this.ghost = undefined;

  }

  static update(entities) {
    const pack = [];

    for (let i in Player.list) {
      let player = Player.list[i];
      player.update(entities);
      pack.push(player);
    }

    return pack;
  }


  update(entities) {
    super.update();
    if (entities) this.updateNearestObjects(entities);
    this.updatePosition(entities);
    this.chop();
  }

  updateNearestObjects(entities) {
  
    this.fire = entities.fire;
    const trees = Object.values(entities.tree)
    const sortedTrees = trees.sort((a, b) => {
      return this.distance(a) - this.distance(b);
    });

    const closestTree = sortedTrees[0];

    if (this.distance(closestTree) < 70) {
      this.tree = closestTree;
    } else {
      this.tree = undefined;
    }

    if (this.distance(this.fire) < 100 && this.state === "LOGS") {
      console.log(this.distance(this.fire))
      this.state = "TORCH"
    }
  }

  updatePosition(entities) {
    const trees = Object.values(entities.tree);
   
    const tempPos = { x: this.x, y: this.y };

    if (this.pressingRight) tempPos.x += this.speed;
    if (this.pressingLeft) tempPos.x -= this.speed;
    if (this.pressingDown) tempPos.y += this.speed;
    if (this.pressingUp) tempPos.y -= this.speed;

    if (!this.playerTreeCollision(tempPos, trees) && !this.playerFireCollision(tempPos, this.fire)) {
      this.x = tempPos.x;
      this.y = tempPos.y;
    }

    if (this.pressingChop && this.distance(this.fire) < 110 && this.state === "TORCH") {
      this.fire.eatLogs();
      this.state = "NEUTRAL"
    }

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


  playerTreeCollision(tempPos, treeList) {
    return Object.values(treeList).some(tree => {
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

    if (distance < this.size + fire.size){
      return true;
    }
  };
};

Player.list = {};

// change to webpack?
module.exports = Player;