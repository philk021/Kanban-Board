import express from 'express';
import { postBoardUser } from '../controllers/boardUserController.js';

export const boardUserRouter = express.Router();

boardUserRouter.post('/', postBoardUser);