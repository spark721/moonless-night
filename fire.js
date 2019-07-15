const Entity = require('./entity');

class Fire extends Entity {
  constructor(id) {
    super(id)

    this.state = {
      x: 700,
      y: 375,
      firePower: 10,
      radius: 50,
      gameOver: false
    }

    this.dwindle = this.dwindle.bind(this);
    this.updateRadius = this.updateRadius.bind(this);
  };

  updateRadius () {
    this.state.radius = this.state.firePower * 5;
  }

  dwindle () {
    if(this.state.firePower > 0){

      this.state.firePower -= 1;
      this.updateRadius();
      console.log(`Dwindling ` + `${this.state.firePower}`);
    } else {
      console.log("Game Over")
    }
  };

};

module.exports = Fire;