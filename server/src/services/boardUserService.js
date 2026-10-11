import { db } from '../config/db.js';

export const createBoardUser = async (userId, boardId, boardRole) => {
  const [result] = await db.query(
    'INSERT INTO kanban_db.board_users (board_id, user_id, board_role) VALUES (?, ?, ?)',
  [userId, boardId, boardRole]);
  return result;
};