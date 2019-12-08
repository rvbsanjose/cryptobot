const uuid = require('uuid/v4');

module.exports = subject => {
  const _observers = {};
  
  return {
    ...subject,
    detach: o => delete _observers[o.id],
    attach: o => _observers[o.id = uuid()] = o,
    notify: data => Object.values(_observers).forEach(o => o.update(data))
  };
};