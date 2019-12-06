const WebSocket = require('ws');
const BaseEmitter = require('../common/baseEmitter');
const { PRICE_UPDATED } = require('../enums/events');

class Coinbase extends BaseEmitter {
  constructor() {
    super();

    this.onOpen = this.onOpen.bind(this);
    this.onMessage = this.onMessage.bind(this);

    this.socket =  new WebSocket('wss://ws-feed.pro.coinbase.com');

    this.initListeners();
  }

  initListeners() {
    this.socket.on('open', this.onOpen);
    this.socket.on('error', this.onError);
    this.socket.on('close', this.onClose);
    this.socket.on('message', this.onMessage);
  }

  onOpen() {
    this.socket.send(
      JSON.stringify({
        type: 'subscribe',
        channels: [
          {
            name: 'ticker',
            product_ids: [
              'BTC-USD',
              'ETH-USD',
              'BAT-USDC',
              'ZRX-USD',
              'ZEC-USD',
              'XTZ-USD',
              'XRP-USD',
              'XLM-USD',
              'REP-USD',
              'LTC-USD',
              'LINK-USD',
              'ETC-USD',
              'EOS-USD',
              'DASH-USD',
              'BCH-USD'
            ]
          },
          {
            name: 'heartbeat',
            product_ids: [
              'BTC-USD',
              'ETH-USD',
              'BAT-USDC',
              'ZRX-USD',
              'ZEC-USD',
              'XTZ-USD',
              'XRP-USD',
              'XLM-USD',
              'REP-USD',
              'LTC-USD',
              'LINK-USD',
              'ETC-USD',
              'EOS-USD',
              'DASH-USD',
              'BCH-USD'
            ]
          }
        ]
      })
    );
  }

  onMessage(data) {
    try {
      const rsp = JSON.parse(data);

      if (rsp.type === 'ticker') {
        this.ee.emit(PRICE_UPDATED, {
          side: rsp.side,
          price: rsp.price,
          id: rsp.product_id
        });
      }
    } catch {
      console.log('Could not parse data from Coinbase');
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