class Entity {
  constructor(id) {
    this.x = Math.floor(Math.random() * 1000),
    this.y = Math.floor(Math.random() * 1000),
    this.id = id
  }

  update() {
    
  }
}

module.exports = Entity;