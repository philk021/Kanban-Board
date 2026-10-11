import { db } from '../config/db.js';

export const createBoardUser = async (user_id, board_id, board_role) => {
  const [result] = await db.query(
    'INSERT INTO project_management_db.board_users (board_id, user_id, board_role) VALUES (?, ?, ?)',
  [board_id, user_id, board_role]);
  return result;
};