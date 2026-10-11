import express from 'express';
import { getBoards, postBoard, putBoard, deleteBoard } from '../controllers/boardController.js';

export const boardRouter = express.Router();

boardRouter.get('/', getBoards);
boardRouter.post('/', postBoard);
boardRouter.put('/:boardId', putBoard);
boardRouter.delete('/:boardId', deleteBoard);