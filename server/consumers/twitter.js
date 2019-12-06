const BaseEmitter = require('../common/baseEmitter');
const { PRICE_UPDATED } = require('../enums/events');

class Twitter extends BaseEmitter {
  constructor() {
    super();

    this.onUpdate = this.onUpdate.bind(this);

    this.initEventListeners();
  }

  initEventListeners() {
    this.ee.addListener(PRICE_UPDATED, this.onUpdate);
  }

  onUpdate(message) {
    console.log(message);
  }
}

module.exports = Twitter;