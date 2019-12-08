const WebSocket = require('ws');

module.exports = (url, callbacks = {}) => {
  let websocket;

  const initWebSocket = () => {
    const open = () => {};
    const error = e => console.log(e);
    const close = () => setTimeout(() => initWebSocket(), (1000 * 60) * 3);

    const message = message => {
      try {
        return JSON.parse(message);
      } catch (e) {
        throw e;
      }
    };

    websocket = new WebSocket(url);

    websocket.on('open', open);
    websocket.on('error', error);
    websocket.on('close', close);
    websocket.on('message', message);

    Object.entries(websocket._events).forEach(([event, callback]) => {
      if (callbacks.hasOwnProperty(event)) {
        websocket.on(event, (...args) => callbacks[event](callback(...args)));
      }
    });

    return websocket;
  };

  if (websocket && websocket.readyState === WebSocket.OPEN) {
    websocket.close();
  }

  return initWebSocket();
};