import { fetchTasks, createTask, updateTask, removeTask } from '../services/taskService.js';
import { groupByCategory } from '../utils/groupByCategory.js';

export const getTasks = async (req, res) => {
  const boardId = req.params.boardId;
  const user = req.user;
  try {
    const { categories, tasks } = await fetchTasks(user, boardId);
    const categorized = groupByCategory(categories, tasks);
    return res.status(200).json(categorized);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
};

export const postTask = async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.body.task_id;
  const title = req.body.task_title;
  const description = req.body.task_description;
  const category = req.body.task_category;
  const categoryId = req.body.category_id;
  const priority = req.body.task_priority;
  const createdAt = req.body.created_at;
  const user = req.user;
  
  if (!taskId || !categoryId || !title || !description || !category || !priority || !createdAt) {
    return res.status(500).json({ message: 'Missing task fields' });
  };
  
  try {
    await createTask(
      user, taskId, boardId, categoryId, title, description, category, priority, createdAt
    );
    return res.status(201).json({ message: 'Task created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
};

export const putTask = async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const title = req.body.task_title;
  const description = req.body.task_description;
  const category = req.body.task_category;
  const priority = req.body.task_priority;
  const createdAt = req.body.created_at;
  const user = req.user;
  
  if (!title || !description || !category || !priority || !createdAt) {
    res.status(500).json({ message: 'Missing task fields' });
  };
  
  try {
    await updateTask(taskId, title, description, category, priority, createdAt);
    const tasks = await fetchTasks(user, boardId);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
};

export const deleteTask = async (req, res) => {
  const boardId = req.params.boardId
  const taskId = req.params.taskId;
  const user = req.user;
  try {
    await removeTask(taskId);
    const tasks = await fetchTasks(user, boardId);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
};