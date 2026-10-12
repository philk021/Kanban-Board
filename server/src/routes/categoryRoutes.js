import express from 'express';
import { postCategory } from '../controllers/categoryController.js';

export const categoryRouter = express.Router();

categoryRouter.post('/', postCategory);