const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { ApolloServer } = require('apollo-server');

const initApolloServer = () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  });

  apolloServer.listen().then(({ url }) => {
    console.log(`🚀 - Server ready at ${url}`);
  });
};

module.exports = {
  initApolloServer
};