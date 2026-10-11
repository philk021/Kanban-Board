import express from 'express';
import { getTasks, postTask, putTask, deleteTask } from '../controllers/taskController.js';

export const taskRouter = express.Router({ mergeParams: true });

taskRouter.get('/', getTasks);
taskRouter.post('/', postTask);
taskRouter.put('/:taskId', putTask);
taskRouter.delete('/:taskId', deleteTask);