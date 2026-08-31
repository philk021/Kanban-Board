const { authenticateSocketToken } = require('./middleware/socketAuth');
const { getUserId } = require('./db/db_connection');
const { Server } = require('socket.io');
const express = require('express');
const http = require('http');

const users = {};
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.API_URL,
    credentials: true
  }
});

io.use(authenticateSocketToken);

io.on('connection', async (socket) => {
  
});

module.exports = { io, app, server };