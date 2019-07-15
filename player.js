const Entity = require("./entity");

// this.state = ['NEUTRAL', 'FETAL', 'TORCH', 'LOG', 'STICK', 'HEALING', 'BEINGHEALED']

class Player extends Entity {

  constructor(id, pos, size) {
    super(id, pos, size);

    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.state = "NEUTRAL";
    this.speed = 10

  };

  // nice
  update() {
    super.update();
    this.updatePosition();
  }

  updatePosition() {
    if (['NEUTRAL', 'RUNNING', 'CARRYTORCH', 'CARRYLOG'].includes(this.state)) {
      if (this.pressingRight) this.x += this.speed;
      if (this.pressingLeft) this.x -= this.speed;
      if (this.pressingUp) this.y -= this.speed;
      if (this.pressingDown) this.y += this.speed;
    }
  };

};

// change to webpack?
module.exports = Player;