const { gql } = require('apollo-server');

const queries = gql`
  type Query {
    getTicker(id: String!): Ticker!
  }
`;

module.exports = queries;