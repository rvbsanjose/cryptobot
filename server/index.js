const providers = require('./providers');
const consumers = require('./consumers');
const { initApolloServer } = require('./apollo');

// Init data providers
providers.forEach(Provider => new Provider());

// Init data consumers
consumers.forEach(Consumer => new Consumer());

// Init apollo server
initApolloServer();
