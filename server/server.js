require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const boardRouter = require('./routes/boardRoutes');
const {authenticateToken} = require('./middleware/auth');
const { WebSocketServer } = require('ws');
const url = require('url');

const app = express();

app.use(cors({
  origin: process.env.API_URL,
  credentials: true
}));

app.use(express.json());
app.use('/auth', authRouter);
app.use(authenticateToken);
app.use('/boards', boardRouter);

app.use((req, res, next) => {
  res.status(404).json({message: "404 Error: Resource not Found."});
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

const wsServer = new WebSocketServer({ noServer: true });
//server.on('connection', (connection, request) => {
//  const { user_email } = url.parse(request.url, true).query;
//})