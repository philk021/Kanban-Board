const { authenticateSocketToken } = require('./middleware/socketAuth');
const { Server } = require('socket.io');
const express = require('express');
const http = require('http');

const users = {};
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.API_URL,
    credentials: true,
  }
});

io.use(authenticateSocketToken);

io.on('connection', async (socket) => {
  console.log(`socket connected: ${socket.id}`);

  socket.on('board:join', (boardId) => {
    if (!boardId) return;
    socket.join(roomName(boardId));
    socket.data.boardId = boardId;
    console.log(`socket ${socket.id} joined board ${boardId}`);
  });

  socket.on('board:leave', (boardId) => {
    if (!boardId) return;
    socket.leave(roomName(boardId));
  });

  socket.on('task:create', (payload) => {
    const { boardId, task } = payload || {};
    if (!boardId || !task) return;

    socket.to(roomName(boardId)).emit('task:created', task);
  });

  socket.on('disconnect', () => {
    console.log(`socket disconnected: ${socket.id}`);
  });
});

function roomName(boardId) {
  return `board:${boardId}`;
}

module.exports = { io, app, server };