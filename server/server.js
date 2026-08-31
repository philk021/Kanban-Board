require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const boardRouter = require('./routes/boardRoutes');
const { authenticateToken } = require('./middleware/auth');
const { app, server } = require('./socket');

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

server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});