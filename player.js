const Entity = require("./entity");

class Player extends Entity {
  constructor(id) {
    super(id);
    this.x = 700,
    this.y = 300,
    this.pressingRight = false,
    this.pressingLeft = false,
    this.pressingUp = false,
    this.pressingDown = false,
    this.maxSpeed = 10
    this.carryingTorch = false,
    this.baby = false,
    this.healingPlayer = false,
    this.healing = false,
  };

  // nice
  update() {
    this.updatePosition();
    super.update();
  }

  updatePosition() {
    if (this.pressingRight) this.x += this.maxSpeed;
    if (this.pressingLeft) this.x -= this.maxSpeed;
    if (this.pressingUp) this.y -= this.maxSpeed;
    if (this.pressingDown) this.y += this.maxSpeed;
  };

};

// change to webpack
module.exports = Player;