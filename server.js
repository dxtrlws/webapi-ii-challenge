const express = require('express');
const PostRouter = require('./routes/post-routes');

const server = express();

server.use(express.json());
server.use('/api/posts', PostRouter);

module.exports = server;
