import Entity from '../entity';

class Log extends Entity {
  constructor(id, pos, size) {
    super(id, pos, size);
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

  update() {

  }

  // Updates state of fire. Will eventually be ["CRITICAL", "VERY LOW", "LOW", "MEDIUM", "HIGH"]
  updateRadius() {
      // this.radius = this.firePower * 5;
  }
};

Log.list = {};

export default Log;
