import { db } from '../config/db.js';

export const createUser = async (id, email, password, createdAt) => {
  const [result] = await db.query(
    'INSERT INTO kanban_db.users(user_id, user_email, user_password, created_at) \
     VALUES(UUID_TO_BIN(?), ?, ?, ?)',
    [id, email, password, createdAt]);
  return result;
};

export const loginUser = async (email) => {
  const [result] = await db.query(
    'SELECT user_email, user_password \
     FROM kanban_db.users \
     WHERE user_email = ?',
    [email]);
  return result;
};

export const storeRefreshToken = async (token) => {
  const [result] = await db.query(
    'INSERT INTO kanban_db.refresh_tokens(token) VALUES(?)', 
    token);
  return result;
};