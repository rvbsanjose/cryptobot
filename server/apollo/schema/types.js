const { gql } = require('apollo-server');

const types = gql`
  type Ticker {
    id: String!
    side: String!
    price: String!
  }
`;

module.exports = types;