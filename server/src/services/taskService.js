import { db } from '../config/db.js';

export const fetchTasks = async (boardId) => {
  const [result] = await db.query(
    'SELECT * FROM kanban_db.tasks WHERE board_id = ?', 
  [boardId]);
  return result;
};

export const createTask = async (taskId, boardId, title, description, category, priority, createdAt) => {
  const [result] = await db.query(
    'INSERT INTO kanban_db.tasks(task_id, task_title, task_description, task_category, task_priority, created_at, board_id) \
     VALUES(?, ?, ?, ?, ?, ?, ?)',
  [taskId, title, description, category, priority, createdAt, boardId]);
  return result;
};

export const updateTask = async (id, name, description, createdAt) => {
  await db.query(
    'UPDATE kanban_db.tasks SET task_title = ?, task_description = ?, created_at = ? WHERE task_id = ?',
  [name, description, createdAt, id]);
};

export const removeTask = async (id) => {
  await db.query(
    'DELETE FROM kanban_db.tasks WHERE task_id = ?', 
  [id]);
};