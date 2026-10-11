import { db, getUserId } from '../config/db.js';

export const fetchTasks = async (user, boardId) => {
  const userId = await getUserId(user);
  const [result] = await db.query(
    'SELECT BIN_TO_UUID(t.task_id) as task_id, t.task_title, t.task_priority, t.created_at, c.category_title, b.board_id \
     FROM kanban_db.tasks t \
     JOIN kanban_db.categories c ON c.category_id = t.category_id \
     JOIN kanban_db.boards b ON b.board_id = c.board_id \
     WHERE b.user_id = ? and b.board_id = ?',
  [userId, boardId]);
  return result;
};

export const createTask = async (
  taskId, 
  boardId, 
  title, 
  description, 
  category, 
  priority, 
  createdAt
) => {
  const [result] = await db.query(
    'INSERT INTO kanban_db.tasks( \
     task_id, \
     task_title, \
     task_description, \
     task_category, \
     task_priority, \
     created_at, \
     board_id) \
     VALUES(?, ?, ?, ?, ?, ?, ?)',
  [taskId, title, description, category, priority, createdAt, boardId]);
  return result;
};

export const updateTask = async (id, name, description, createdAt) => {
  const result = await db.query(
    'UPDATE kanban_db.tasks \
     SET task_title = ?, task_description = ?, created_at = ? \
     WHERE task_id = ?',
  [name, description, createdAt, id]);
  return result;
};

export const removeTask = async (id) => {
  const result = await db.query(
    'DELETE FROM kanban_db.tasks \
     WHERE task_id = ?', 
  [id]);
  return result;
};