const Entity = require("../entity");
const Fire = require("../fire");

// this.state = ['NEUTRAL', 'FETAL', 'TORCH', 'LOG', 'STICK', 'HEALING', 'BEINGHEALED']

class Stalker extends Entity {

  constructor(id, pos, size) {
    super(id, pos, size);
    this.state = "NEUTRAL";
    this.moveCd = 2;
    this.moveCdMax = 2;
    this.speed = 3;
    this.spawned = 0;
    this.cdMax = 2400;
    this.cd = 1500;
    this.deathCd = 720;
    this.summoningSickness = 120;
    this.player = undefined;
    this.spawnStalker = this.spawnStalker.bind(this);
  }

  static update() {
    const pack = [];

    for (let i in Stalker.list) {
      const stalker = Stalker.list[i];

      stalker.update();
      pack.push(stalker);
    }
    return pack;
  }

  spawnStalker() {
    if (Stalker.count % 600 === 0){
      if(this.cdMax > 800){
        this.cdMax -= 600;
      } else if ((this.cdMax < 801)&&(this.cdMax > 100)){
        this.cdMax -= 100;
      } else if ((this.cdMax < 101)&&(this.cdMax > 60)){
        this.cdMax -= 20;
      } else {
        this.cdMax = 50;
      }
    }

    if (this.cd === 0) {
      let pos = {
        x: Math.floor(Math.random() * 1400),
        y: Math.floor(Math.random() * 788)
      };
      this.spawned += 1;
      let stalker = new Stalker(this.spawned, pos, 30);
      Stalker.list[this.spawned] = stalker;
      this.cd = this.cdMax;
      this.spawnCd = false;
   
    }
    this.cd -= 1;
  }

  delete() {
    if (this.deathCd === 0) {
      delete Stalker.list[this.id];
    }
    this.deathCd--;
  }

  summonSickness() {
    if (this.summoningSickness > 0) {
      this.summoningSickness--;
      this.speed = 0;
      // return false;
    } else {
      this.speed = 1;
      // return true;
    }
  }

  // nice
  update() {
    super.update();
    this.summonSickness();
    if (this.moveCd === 0){
      this.updatePosition();
      this.moveCd = this.moveCdMax;
    }
    this.delete();
    this.moveCd --;
  }

  // collideWithFire(fire) {
  //     if ((this.x <= 710 && this.x >= 690) && (this.y <= 360 && this.y >= 340)) {
  //         fire.firePower = fire.firePower - 10;
  //         delete Stalker.list[this.id];
  //     }
  // }
  collideWithPlayer() {
    for (let i in Stalker.players) {
    
      if (
        this.x >= Stalker.players[i].x - 10 &&
        this.x <= Stalker.players[i].x + 10 &&
        (this.y >= Stalker.players[i].y - 10 &&
          this.y <= Stalker.players[i].y + 10)
      ) {
      
      }
    }
  }

  moveToObject(object) {
    if (object === undefined) {
      this.x = this.x;
      this.y = this.y;
    } else {

      let diffX = object.x - this.x;
      let diffY = object.y - this.y;
      if (diffX > 0) {
        this.x += this.speed;
      } else {
        this.x -= this.speed;
      }
      if (diffY > 0) {
        this.y += this.speed;
      } else {
        this.y -= this.speed;
      }
    }
  }
  
  updateNearestObjects(players) {
    if (players !== undefined) {
      let playersValues = Object.values(players).filter(player => player.state !== "FETAL");

      let sortedPlayers = playersValues.sort((a, b) => {
        return this.distance(a) - this.distance(b);
      });

      let closestPlayer = sortedPlayers[0];
      this.player = closestPlayer;
    } else {
      this.player = undefined;
    }
  }

  distance(object) {
    if (object === undefined) return 0;
    let dx = this.x - object.x;
    let dy = this.y - object.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  updatePosition() {
    this.updateNearestObjects(Stalker.players);
    this.moveToObject(this.player);
    this.collideWithPlayer();
  }

};

Stalker.list = {};
// change to webpack?
module.exports = Stalker;