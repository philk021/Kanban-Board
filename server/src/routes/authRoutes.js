import express from 'express';
import { login, signup, refresh } from '../controllers/authController.js';

export const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/refresh', refresh);