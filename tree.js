const Entity = require("./entity");

// this.state = ["NEUTRAL", "CHOPPED"]

class Tree extends Entity {
  constructor(id, pos, size) {
    super(id, pos, size);
    this.logs = 5;
    this.state = "NEUTRAL"
  }

  // call chopped when tree is chopped
  chopped() {
    this.logs -= 1;
  }

  // nice
  update() {
    super.update();
    this.updateSize();
  }

  // update 
  updateSize() {
    this.size = this.logs * 10;
  }
}

// change to webpack
module.exports = Tree;
