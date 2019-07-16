const Entity = require("./entity");

// this.state = ["NEUTRAL", "CHOPPED"]

class Tree extends Entity {
  constructor(id, pos, size) {
    super(id, pos, size);
    this.logs = 3;
    this.state = "NEUTRAL";
  }

  static spawnTrees() {
    // let i = 0;

    // for (let x = 1; x < 5; x++) {
    //   for (let y = 1; y < 4; y++) {        
    //     let pos = {
    //       x: 175 + 350*(x - 1),
    //       y: 50 + 200*y,
    //     };
        
    //     i += 1;
    //     let tree = new Tree(i, pos, 25);
    //     this.list[i] = tree;
    //   }
    // }

    Object.values(Tree.createNodes(24, 300)).forEach(tree => {
      let pos = { x: tree.x, y: tree.y };
      this.list[tree.id] = new Tree(tree.id, pos, 10);
    });
  }

  static createNodes(numNodes, radius) {
    const nodes = [];
    const width = (radius * 2) + 700;

    for (let i=0; i < numNodes; i++) {
      let angle = (i / (numNodes/2)) * Math.PI; // Calculate the angle at which the element will be placed.
      let x = (radius * Math.cos(angle)) + (width/2) + 40; // Calculate the x position of the element.
      let y = (radius * 0.75 * Math.sin(angle)) + (width/2) - 175; // Calculate the y position of the element.
      nodes.push({'id': i, 'x': x, 'y': y});
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
