const Entity = require("./entity");

// this.state = ["NEUTRAL", "CHOPPED"]

class Tree extends Entity {
  constructor(id, pos, size) {
    super(id, pos, size);
    this.logs = 5;
    this.state = "NEUTRAL";
  }

  static spawnTrees() {
    for (let i = 0; i < 10; i++) {
      let pos = {
        x: Math.floor(Math.random() * 1400),
        y: Math.floor(Math.random() * 750)
      };

      let tree = new Tree(i, pos, 25);
      this.list[i] = tree;
    }
  }

  static update() {
    const pack = [];

    for (let i in Tree.list) {
      const tree = Tree.list[i];
      tree.update();
      pack.push(tree);
    }

    return pack;
  }

  // call chopped when tree is chopped
  chopped() {
    this.logs -= 1;
  }

  update() {
    super.update();
    this.updateSize();
  }

  // update
  updateSize() {
    this.size = this.logs * 10;
  }
}

Tree.list = {};

// change to webpack
module.exports = Tree;
