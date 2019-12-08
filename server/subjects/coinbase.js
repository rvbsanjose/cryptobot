const axios = require('axios');
const observable = require('../lib/observable');
const observer = require('../observers/coinbase');

module.exports = () => {
  const subject = observable({
    execute: async () => {
      try {
        const { data } = await axios.get('https://api.pro.coinbase.com/products');

        subject.notify(data.reduce((accumulator, product) => {
          if (['BTC', 'DAI', 'USD', 'USDC'].includes(product.quote_currency)) {
            accumulator[product.id] = { base: product.base_currency, quote: product.quote_currency };
          }
        
          return accumulator;
        }, {}));
      } catch (e) {
        throw e;
      }
    }
  });

  observer(subject);

  setInterval(() => subject.execute(), (1000 * 60) * 60);

  return subject;
};