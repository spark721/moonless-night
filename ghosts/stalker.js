const Entity = require("../entity");
const Fire = require("../fire")

// this.state = ['NEUTRAL', 'FETAL', 'TORCH', 'LOG', 'STICK', 'HEALING', 'BEINGHEALED']

class Stalker extends Entity {
    constructor(id, pos, size) {
        super(id, pos, size);
        this.state = "NEUTRAL";
        this.speed = 1;
        this.spawned = 0;
        this.cdMax = 2400;
        this.cd = 60;
        this.player = undefined;
        this.spawnStalker = this.spawnStalker.bind(this);
    };


    static update() {
        const pack = [];

        for (let i in Stalker.list) {
            const stalker = Stalker.list[i];

            stalker.update();
            pack.push(stalker)
        }
        return pack;
    }

    spawnStalker() {
        // console.log(this.cd)
        if (this.cd === 0) {
            let pos = {
                x: Math.floor(Math.random() * 1400),
                y: Math.floor(Math.random() * 750)
            }
            this.spawned += 1;
            let stalker = new Stalker(this.spawned, pos, 30);
            Stalker.list[this.spawned] = stalker;
            this.cd = this.cdMax;
        }
        this.cd -= 1
    }

    // nice
    update() {
        super.update();
        this.updatePosition();
    }

    // collideWithFire(fire) {
    //     if ((this.x <= 710 && this.x >= 690) && (this.y <= 360 && this.y >= 340)) {
    //         fire.firePower = fire.firePower - 10;
    //         delete Stalker.list[this.id];
    //     }
    // }
    collideWithPlayer() {
        for (let i in Stalker.players) {
            // console.log(Specter.players[i].x);
            if ((this.x >= Stalker.players[i].x - 10 && this.x <= Stalker.players[i].x + 10) && (this.y >= Stalker.players[i].y - 10 && this.y <= Stalker.players[i].y + 10)) {
                // console.log('Stalker collided with player')
            }
        }
    }

    moveToObject(object) {
        if(object === undefined){
            this.x = this.x;
            this.y = this.y;
        }else{
            // console.log(object.x);
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
        if (players !== undefined){
            const playersValues = Object.values(players)
            const sortedPlayers = playersValues.sort((a, b) => {
                return this.distance(a) - this.distance(b);
            });
    
            const closestPlayer = sortedPlayers[0];
            this.player = closestPlayer;
        }else{
            this.player = undefined;
        }

        // if (this.distance(closestPlayer) < 70) {
        // } else {
        //     this.player = undefined;
        // }

    }

    updatePosition() {
        this.updateNearestObjects(Stalker.players)
        this.moveToObject(this.player);
        this.collideWithPlayer();
    };


};
Stalker.list = {};
// change to webpack?
module.exports = Stalker;