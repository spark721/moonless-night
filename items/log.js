const Entity = require('../entity');

// this.state = {
//   CRITICAL: false,
//   VERY_LOW: false,
//   LOW: false,
//   MEDIUM: true,
//   HIGH: false
// }

class Log extends Entity {
    constructor(id, pos, size) {
        super(id, pos, size)

        // this.firePower = 20;
        // this.radius = this.firePower * 5;
        // this.gameOver = false;

        // this.dwindle = this.dwindle.bind(this);
        // this.updateRadius = this.updateRadius.bind(this);
    };

    static update() {
        const pack = [];

        for (let i in Log.list) {
            const log = Log.list[i];

            log.update();
            pack.push(log)
        }
        return pack;
    }

    static delete(logId) {
        delete Log.list[logId];
    }

    update(){

    }

    // Updates state of fire. Will eventually be ["CRITICAL", "VERY LOW", "LOW", "MEDIUM", "HIGH"]
    updateRadius() {
        // this.radius = this.firePower * 5;
    }


};
Log.list = {};
module.exports = Log;
