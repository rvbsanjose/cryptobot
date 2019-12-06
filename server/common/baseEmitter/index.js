const { useEventEmitter } = require('../../utils/events');

class BaseEmitter {
  constructor() {
    this.ee = useEventEmitter();
  }
}

module.exports = BaseEmitter;