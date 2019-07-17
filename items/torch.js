const Entity = require('../entity');

// this.state = {
//   CRITICAL: false,
//   VERY_LOW: false,
//   LOW: false,
//   MEDIUM: true,
//   HIGH: false
// }

class Torch extends Entity {
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

        for (let i in Torch.list) {
            const torch = Torch.list[i];

            torch.update();
            pack.push(torch)
        }
        return pack;
    }
    static delete(torchId) {
        delete Torch.list[torchId];
    }


    update(){

    }

    // Updates state of fire. Will eventually be ["CRITICAL", "VERY LOW", "LOW", "MEDIUM", "HIGH"]
    // updateRadius() {
    //     this.radius = this.firePower * 5;
    // }



    // When fire has dwindled to 0 firePower, game is over. Set gameOver to true.
    dwindle() {
        // if (this.firePower > 1) {
        //     this.firePower -= 1;
        //     this.updateRadius();
        //     console.log(`Dwindling ` + `${this.firePower}`);
        // } else {
        //     console.log("Game Over");
        //     this.gameOver = true;
        // }
    };


};
Torch.list = {};
module.exports = Torch;
