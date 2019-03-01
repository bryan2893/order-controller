const http = require('http');
const app = require('./app');

const httpServer = http.createServer(app);

module.exports = httpServer;