const Specter = require("./ghosts/specter");
const Entity = require("./entity");

// this.state = ['NEUTRAL', 'FETAL', 'TORCH', 'LOG', 'STICK', 'HEALING', 'BEINGHEALED']

class Spawner extends Entity {
    constructor(id, pos, size) {
        super(id, pos, size);
        this.state = "NEUTRAL";
        this.speed = 0;
        this.cd = 0;
        this.cdMax = 180;
        this.spawnSpecters = this.spawnSpecters.bind(this);
        this.specterList = {};
    };

    // add to a spawn file
    static spawnSpawner() {
        let i = 1;
        let spawner = new Spawner(i, { x: 350, y: 375 }, 10);
        Spawner.list[i] = spawner;
    }

    static update() {
        const pack = [];

        for (let i in Spawner.list) {
            const spawner = Spawner.list[i];
            spawner.update();
            pack.push(spawner)
        }

        return pack;
    }

    // nice
    update() {
        super.update();
        // this.spawnSpecters();
    }

    spawnSpecters() {
        // if (this.cd === 0) {
        //     let id = Object.keys(this.specterList).length;
        //     let specter = new Specter(id, { x: 1, y: 375 }, 17);
        //     this.specterList[id] = specter;
        //     this.cd = this.cdMax;

        // }
        // this.cd--;
    }


};
Spawner.list = {};
// change to webpack?
module.exports = Spawner;