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
            this.spawned += 1;
            let specter = new Specter(this.spawned, { x: 1, y: 375 }, 15);
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

    updatePosition() {
        this.x += this.speed;
        if (this.x > 700){
            delete Specter.list[this.id];
        }else{
        }
    };


};
Specter.list = {};
// change to webpack?
module.exports = Specter;