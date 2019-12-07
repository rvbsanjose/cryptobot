const TwitterClient = require('twitter');
const BaseEmitter = require('../common/baseEmitter');
const { WHALE_ALERT } = require('../constants/events');

class Twitter extends BaseEmitter {
  constructor() {
    super();

    this.client = new TwitterClient({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_TOKEN_KEY,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });

    this.onUpdate = this.onUpdate.bind(this);

    this.initEventListeners();
  }

  initEventListeners() {
    this.ee.addListener(WHALE_ALERT, this.onUpdate);
  }

  onUpdate({ size, side, price, productId }) {
    const qty = parseFloat(size, 10);
    const subtotal = parseFloat(price, 10);
    const [product, quote] = productId.split('-');
    const total = (subtotal * qty).toLocaleString({
      currency: 'USD',
      style: 'currency',
      maximumFractionDigits: 2
    });

    const status = 
      `@Coinbase settled a ${side} order of ${qty} #${product} ` +
      `at $${subtotal} ${quote} for a total of $${total} ${quote}`;

    console.log(status);

    this.client.post('statuses/update', { status });
  }
}

module.exports = Twitter;