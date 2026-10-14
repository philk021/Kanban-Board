import express from 'express';
import { postCategory } from '../controllers/categoryController.js';

export const categoryRouter = express.Router({ mergeParams: true });

categoryRouter.post('/', postCategory);