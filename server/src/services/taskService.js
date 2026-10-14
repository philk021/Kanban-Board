import { db, getUserId } from '../config/db.js';

export const fetchTasks = async (user, boardId) => {
  const userId = await getUserId(user);
  const [categories] = await db.query(
    'SELECT BIN_TO_UUID(c.category_id) AS category_id, c.category_title \
     FROM kanban_db.categories c \
     JOIN kanban_db.board_users bu ON bu.board_id = c.board_id \
     WHERE c.board_id = UUID_TO_BIN(?) \
       AND bu.user_id = ?', 
  [boardId, userId]);
  
  const [tasks] = await db.query(
    'SELECT BIN_TO_UUID(t.task_id) AS task_id, \
       task_title, \
       task_description, \
       task_priority, \
       task_category, \
       BIN_TO_UUID(t.category_id) AS category_id, \
       created_at \
     FROM kanban_db.tasks t \
     JOIN kanban_db.categories c ON c.category_id = t.category_id \
     JOIN kanban_db.board_users bu ON bu.board_id = c.board_id \
     WHERE c.board_id = UUID_TO_BIN(?) \
       AND bu.user_id = ?', 
  [boardId, userId]);
  return { categories, tasks };
};

export const createTask = async (
  user,
  taskId, 
  boardId,
  categoryId, 
  title, 
  description, 
  category, 
  priority, 
  createdAt
) => {
  const userId = await getUserId(user);
  const [result] = await db.query(
    'INSERT INTO kanban_db.tasks (task_id, task_title, task_description, task_category, task_priority, created_at, category_id) \
     SELECT UUID_TO_BIN(?), ?, ?, ?, ?, ?, c.category_id \
     FROM kanban_db.categories c \
     JOIN kanban_db.board_users bu ON bu.board_id = c.board_id \
     WHERE c.category_id = UUID_TO_BIN(?) \
       AND c.board_id = UUID_TO_BIN(?) \
        AND bu.user_id = ?',
  [taskId, title, description, category, priority, createdAt, categoryId, boardId, userId]);
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