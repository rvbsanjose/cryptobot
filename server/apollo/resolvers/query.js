const resolver = {
  Query: {
    getTicker: (_parent, { id }) => {
      return {
        id: 'BTC-USD',
        side: 'buy',
        price: '7410.00'
      };
    }
  }
};

module.exports = resolver;