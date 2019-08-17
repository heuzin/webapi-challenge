const express = require('express');

const projectRouter = require("./projectRouter");
const actionRouter = require('./actionRouter');

const server = express();

server.use(express.json());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.send(`<h2>LAMBDA WEBAPI CHALLENGE!</h2>`)
  });

module.exports = server;