const Entity = require("../entity");
const Fire = require("../fire")

// this.state = ['NEUTRAL', 'FETAL', 'TORCH', 'LOG', 'STICK', 'HEALING', 'BEINGHEALED']

class Specter extends Entity {
    constructor(id, pos, size) {
        super(id, pos, size);
        this.state = "NEUTRAL";
        this.speed = 1;
        this.spawned = 0;
        this.cdMax = 360;
        this.cd = 180;
        this.spawnSpecter = this.spawnSpecter.bind(this);
    };

    
    static update() {
        const pack = [];
        
        for (let i in Specter.list) {
            const specter = Specter.list[i];
            
            specter.update();
            pack.push(specter)
        }   
        return pack;
    }
    
    spawnSpecter() {
        // console.log(this.cd)
        if (this.cd === 0){
            let pos = {
                x: Math.floor(Math.random() * 1400),
                y: Math.floor(Math.random() * 750)
            }
            this.spawned += 1;
            let specter = new Specter(this.spawned, pos, 15);
            Specter.list[this.spawned] = specter;
            this.cd = this.cdMax;
        }
        this.cd -= 1
    }

    // nice
    update() {
        super.update();
        this.updatePosition();
    }
    moveToObject(object){
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
    updatePosition() {
        this.moveToObject(Specter.fire)
        if ((this.x <= 710 & this.x >= 690) && (this.y <= 360 & this.y >= 340)) {
            delete Specter.list[this.id];
        }
    };


};
Specter.list = {};
// change to webpack?
module.exports = Specter;