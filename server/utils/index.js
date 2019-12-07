const { MATCH } = require('../constants/orderTypes');

const isWhaleAlert = payload => {
  const triggerPrice = 15000;

  if (payload.type !== MATCH) {
    return false;
  }

  return (parseFloat(payload.size, 10) * parseFloat(payload.price, 10)) >= triggerPrice;
};

module.exports = {
  isWhaleAlert
};