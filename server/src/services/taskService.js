import { db } from '../config/db.js';

export const fetchTasks = async (board_id) => {
  const [result] = await db.query(
    'SELECT * FROM project_management_db.tasks WHERE board_id = ?', 
  [board_id]);
  return result;
};

export const createTask = async (board_id, title, description, category, priority, date) => {
  const [result] = await db.query(
    'INSERT INTO project_management_db.tasks(task_title, task_description, task_date, task_category, \
     task_priority, board_id) VALUES(?, ?, ?, ?, ?, ?)',
  [title, description, date, category, priority, board_id]);
  return result;
};

export const updateTask = async (id, name, description, date) => {
  await db.query(
    'UPDATE project_management_db.tasks SET task_title = ?, task_description = ?, task_date = ? WHERE task_id = ?',
  [name, description, date, id]);
};

export const removeTask = async (id) => {
  await db.query(
    'DELETE FROM project_management_db.tasks WHERE task_id = ?', 
  [id]);
};