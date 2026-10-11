import { fetchTasks, createTask, updateTask, removeTask } from '../services/taskService.js';

export const getTasks = async (req, res) => {
  const boardId = req.params.boardId;
  try {
    const tasks = await fetchTasks(boardId);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
}

export const postTask = async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.body.taskId;
  const title = req.body.task_title;
  const description = req.body.task_description;
  const category = req.body.task_category;
  const priority = req.body.task_priority;
  const createdAt = req.body.created_at;
  
  if (!taskId || !title || !description || !category || !createdAt) {
    res.status(500).json({ message: 'Missing task fields' });
  };
  
  try {
    const result = await createTask(
      taskId, boardId, title, description, category, priority, createdAt
    );
    const tasks = await fetchTasks(boardId);
    res.status(201).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
}

export const putTask = async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const title = req.body.task_title;
  const description = req.body.task_description;
  const category = req.body.task_category;
  const priority = req.body.task_priority;
  const createdAt = req.body.created_at;
  
  if (!title || !description || !category || !priority || !createdAt) {
    res.status(500).json({ message: 'Missing task fields' });
  };
  
  try {
    await updateTask(taskId, title, description, date);
    const tasks = await fetchTasks(boardId);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
}

export const deleteTask = async (req, res) => {
  const boardId = req.params.boardId
  const taskId = req.params.taskId;
  try {
    await removeTask(taskId);
    const tasks = await fetchTasks(boardId);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
}