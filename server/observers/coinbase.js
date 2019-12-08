const websocket = require('../lib/websocket');

module.exports = subject => {
  let _model;
  let _socket;

  const onOpen = () => {
    _socket.send(JSON.stringify({
      type: 'subscribe',
      channels: [{ name: 'ticker', product_ids: Object.keys(_model) }]
    }));
  };

  const onMessage = message => {
    if (message.type !== 'ticker') {
      return;
    }

    console.log(message);
  };

  const observer = {
    update: data => {
      _model = Object.freeze(data);

      _socket = websocket('wss://ws-feed.pro.coinbase.com', {
        open: onOpen,
        message: onMessage
      });
    }
  };

  return subject.attach(observer) && observer;
};