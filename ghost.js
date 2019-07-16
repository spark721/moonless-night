const Entity = require("./entity");

class Ghost extends Entity {
    constructor(id, pos, size) {
        super(id, pos, size);
    }

    update() {

    }
}

module.exports = Ghost;