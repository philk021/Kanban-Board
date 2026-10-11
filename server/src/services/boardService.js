import { db, getUserId } from '../config/db.js';
import { createBoardUser } from './boardUserService.js';

export const fetchBoards = async (user) => {
  const userId = await getUserId(user);
  const [result] = await db.query(
    'SELECT BIN_TO_UUID(b.board_id) as board_id, b.board_title, bu.board_role \
     FROM kanban_db.boards b \
     JOIN kanban_db.board_users bu ON bu.board_id = b.board_id \
     WHERE bu.user_id = ?',
  [userId]);
  return result;
};

export const createBoard = async (id, user, title, boardRole) => {
  const userId = await getUserId(user);
  const [result] = await db.query(
    'INSERT INTO kanban_db.boards(board_id, board_title, user_id) \
     VALUES(UUID_TO_BIN(?), ?, ?)',
  [id, title, userId]);
  const createdBoard = await createBoardUser(userId, id, boardRole);
  return createdBoard;
};

export const updateBoard = async (id, user, title) => {
  const userId = await getUserId(user);
  const [result] = await db.query(
    'UPDATE kanban_db.boards \
     SET board_title = ? \
     WHERE user_id = ? and board_id = ?',
  [title, userId, id]);
  return result;
};

export const removeBoard = async (id, user) => {
  const userId = await getUserId(user);
  const result = await db.query(
    'DELETE FROM kanban_db.boards \
     WHERE user_id = ? and board_id = ?',
  [userId, id]);
  return result
};