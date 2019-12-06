const EventEmitter = require('events');

let eventEmitter;

const useEventEmitter = () => {
  if (!eventEmitter) {
    eventEmitter = new EventEmitter();
  }

  return eventEmitter;
};

module.exports = {
  useEventEmitter
};