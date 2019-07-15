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
  }

  static update(treeList) {
    const pack = [];

    for (let i in Player.list) {
      let player = Player.list[i];
      player.updatePosition(treeList);
      pack.push(player);
    }

    return pack;
  }

  update() {
    super.update();
    this.updatePosition();
  }

  updatePosition(treeList) {
    let tempPos = { x: this.x, y: this.y };

    if (this.pressingRight) tempPos.x += this.speed;
    if (this.pressingLeft) tempPos.x -= this.speed;
    if (this.pressingDown) tempPos.y += this.speed;
    if (this.pressingUp) tempPos.y -= this.speed;

    if (!this.playerTreeCollision(tempPos, treeList)) {
      this.x = tempPos.x;
      this.y = tempPos.y;
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
};

Player.list = {};

// change to webpack?
module.exports = Player;