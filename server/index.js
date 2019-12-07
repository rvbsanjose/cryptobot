const producers = require('./producers');
const consumers = require('./consumers');
const { initApolloServer } = require('./apollo');

require('dotenv').config();

// Init data producers
producers.forEach(Producer => new Producer());

// Init data consumers
consumers.forEach(Consumer => new Consumer());

// Init apollo server
initApolloServer();
