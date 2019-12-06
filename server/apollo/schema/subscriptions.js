const { gql } = require('apollo-server');

const subscriptions = gql`
  type Subscription {
    priceUpdated: Ticker!
  }
`;

module.exports = subscriptions;