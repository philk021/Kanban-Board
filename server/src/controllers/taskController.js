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
  const { title, description, category, priority, date } = req.body
  
  if (!title || !description || !category || !date) {
    res.status(500).json({ message: 'Missing task fields' });
  };
  
  try {
    const result = await createTask(
      boardId, title, description, category, priority, date
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
  const { title, description, category, priority } = req.body;
  
  if (!title || !description || !category, !priority) {
    res.status(500).json({ error: 'Missing task fields' });
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