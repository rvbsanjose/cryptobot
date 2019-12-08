const subjects = require('./subjects');

require('dotenv').config();

subjects.forEach(subject => subject().execute());