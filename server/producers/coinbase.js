const axios = require('axios');
const WebSocket = require('ws');
const { isWhaleAlert } = require('../utils');
const BaseEmitter = require('../common/baseEmitter');
const { WHALE_ALERT } = require('../constants/events');

class Coinbase extends BaseEmitter {
  constructor() {
    super();

    this.initWebSocket();
  }

  async initWebSocket() {
    this.productIds = await this.getProductIds();
    this.socket =  new WebSocket('wss://ws-feed.pro.coinbase.com');

    this.socket.on('error', this.onError);
    this.socket.on('close', this.onClose);
    this.socket.on('open', () => this.onOpen());
    this.socket.on('message', data => this.onMessage(data));
  }

  async getProductIds() {
    try {
      const { data: products } = await axios.get('https://api.pro.coinbase.com/products');

      return products.reduce((acc, product) => {
        if (['USD', 'USDC'].includes(product.quote_currency)) {
          acc.push(product.id);
        }

        return acc;
      }, []);
    } catch {
      return ['BTC-USD'];
    }
  }

  onOpen() {
    this.socket.send(
      JSON.stringify({
        type: 'subscribe',
        channels: [
          { name: 'full', product_ids: this.productIds },
          { name: 'heartbeat', product_ids: this.productIds }
        ]
      })
    );
  }

  formatPayload(rsp) {
    return {
      type: rsp.type,
      side: rsp.side,
      size: rsp.size,      
      time: rsp.time,
      price: rsp.price,
      productId: rsp.product_id
    };
  }

  onMessage(data) {
    try {
      const payload = this.formatPayload(JSON.parse(data));

      if (isWhaleAlert(payload)) {
        this.ee.emit(WHALE_ALERT, payload);
      }
    } catch (e) {
      console.log('Could not parse data from Coinbase', e);
    }
  }

  onError(error) {
    console.log('Coinbase feed has errors', error);
  }

  onClose() {
    console.log('Coinbase feed closed. Need to reopen');
  }
}

module.exports = Coinbase;