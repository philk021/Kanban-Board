import { db } from '../config/db.js';

export const createUser = async (email, password) => {
  const [result] = await db.query(
    'INSERT INTO project_management_db.users(user_email, user_password) VALUES(?, ?)',
    [email, password]);
  return result;
};

export const loginUser = async (email) => {
  const [result] = await db.query(
    'SELECT user_email, user_password FROM project_management_db.users WHERE user_email = ?',
    [email]);
  return result;
};

export const storeRefreshToken = async (token) => {
  const [result] = await db.query(
    'INSERT INTO project_management_db.refresh_tokens(token) VALUES(?)', 
    token);
  return result;
};