class Entity {
  constructor(id, pos, size) {
    this.x = pos.x;
    this.y = pos.y;
    this.id = id;
    this.size = size;
  }
}

module.exports = Entity;