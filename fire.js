const Entity = require('./entity');

// this.state = {
//   CRITICAL: false,
//   VERY_LOW: false,
//   LOW: false,
//   MEDIUM: true,
//   HIGH: false
// }

class Fire extends Entity {
  constructor(id, pos, size) {
    super(id, pos, size)

    this.firePower = 10;
    this.radius = this.firePower * 5;
    this.gameOver = false;
    this.status = null;

    this.dwindle = this.dwindle.bind(this);
    this.updateRadius = this.updateRadius.bind(this);
  };

  update () {
    let pack = {
      firePower: this.firePower,
      x: this.x,
      y: this.y,
      size: this.size,
      status: this.status
    }
    return pack;
  }

  eatLogs () {
    this.firePower += 5
  }


  // Updates state of fire. Will eventually be ["CRITICAL", "VERY LOW", "LOW", "MEDIUM", "HIGH"]
  updateRadius () {
    this.radius = this.firePower * 5;
  }

  resetFire(){
    this.firePower = 10;
    this.radius = this.firePower * 5;
    this.gameOver = false;
    this.status = null;
  }

  // When fire has dwindled to 0 firePower, game is over. Set gameOver to true.
  dwindle () {
    if(this.firePower > 1){
      this.firePower -= 1;
      this.updateRadius();
      console.log(`Dwindling ` + `${this.firePower}`);

      if (this.firePower > 50) this.status = "HIGH";
      if ((this.firePower > 30) && (this.firePower < 51)) this.status = "MEDIUM";
      if ((this.firePower > 15) && (this.firePower < 31)) this.status = "VERY LOW";
      if (this.firePower < 16) this.status = "CRITICAL";

    } else {
    
      this.gameOver = true;
    }
  };


};

module.exports = Fire;
