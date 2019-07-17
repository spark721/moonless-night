const Entity = require("./entity");

// this.state = ["NEUTRAL", "CHOPPED"]

class Tree extends Entity {
  constructor(id, pos, size) {
    super(id, pos, size);
    this.logs = 3;
    this.state = "NEUTRAL";
  }

  static spawnTree() {
    let i = 0;

    for (let x = 1; x < 9; x++) {
      for (let y = 1; y < 7; y++) {
        if (x < 3 || x > 6) {
          let pos = {
            x: 125 + 155 * (x - 1),
            y: 50 + 110 * y
          };

          if (y % 2 === 0) pos.x += 50;

          i += 1;
          let tree = new Tree(i, pos, 25);
          this.list[i] = tree;
        }
      }
    }

    let numTrees = Object.keys(this.list).length + 1;

    Object.values(Tree.createNodes(24, 300, 40, 175)).forEach(tree => {
      let pos = { x: tree.x, y: tree.y };
      this.list[numTrees] = new Tree(numTrees, pos, 10);
      numTrees += 1;
    });
  }

  static spawnTree2() {
    let i = 0;

    for (let x = 1; x < 9; x++) {
      for (let y = 1; y < 7; y++) {
        let pos = {
          x: 135 + 155 * (x - 1),
          y: 35 + 110 * y
        };

        if (y % 2 === 0) pos.x += 50;

        i += 1;
        let tree = new Tree(i, pos, 25);
        this.list[i] = tree;
      }
    }
  }

  static spawnTree3() {
    let numTrees = Object.keys(this.list).length + 1;

    Object.values(Tree.createNodes(24, 300, 40, 175)).forEach(tree => {
      let pos = { x: tree.x, y: tree.y };
      this.list[numTrees] = new Tree(numTrees, pos, 10);
      numTrees += 1;
    });

    Object.values(Tree.createNodes(24, 500, -145, 425)).forEach(tree => {
      let pos = { x: tree.x, y: tree.y };
      if (pos.y > 80 && pos.y < 780) {
        this.list[numTrees] = new Tree(numTrees, pos, 10);
        numTrees += 1;
      }
    });
  }

  static createNodes(numNodes, radius, xx, yy) {
    const nodes = [];
    const width = radius * 2 + 700;

    for (let i = 0; i < numNodes; i++) {
      let angle = (i / (numNodes / 2)) * Math.PI; // Calculate the angle at which the element will be placed.
      let x = radius * Math.cos(angle) + width / 2 + xx; // Calculate the x position of the element.
      let y = radius * 0.75 * Math.sin(angle) + width / 2 - yy; // Calculate the y position of the element.
      nodes.push({ x: x, y: y });
    }

    return nodes;
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

  // can't call from index.html for some reason
  // getImage() {
  //   return `/client/images/trees/${(tree.id % 4) + 1}${tree.logs}.png`;
  // }
}

Tree.list = {};

// change to webpack
module.exports = Tree;
