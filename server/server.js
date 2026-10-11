import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { authRouter } from './src/routes/authRoutes.js';
import { boardRouter } from './src/routes/boardRoutes.js';
import { taskRouter } from './src/routes/taskRoutes.js';
import { boardUserRouter } from './src/routes/boardUserRoutes.js';
import { authenticateToken } from './src/middleware/auth.js';
import { app, server } from './socket.js';

app.use(cors({
  origin: process.env.API_URL,
  credentials: true,
}));

app.use(express.json());
app.use('/auth', authRouter);
app.use(authenticateToken);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use('/boards/:boardId/users', boardUserRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Error: Resource not Found' });
});

server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});