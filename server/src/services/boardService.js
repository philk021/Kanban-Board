import { db, getUserId } from '../config/db.js';
import { createBoardUser } from './boardUserService.js';

export const fetchBoards = async (user) => {
  const userId = await getUserId(user);
  const [result] = await db.query(
    'SELECT b.board_id, b.board_title, bu.board_role \
     FROM kanban_db.boards b \
     JOIN kanban_db.board_users bu ON bu.board_id = b.board_id \
     WHERE bu.user_id = ?', 
  [userId]);
  return result;
};

export const createBoard = async (title, user, boardRole) => {
  const userId = await getUserId(user);
  const [result] = await db.query(
    'INSERT INTO kanban_db.boards(board_title, user_id) VALUES(?, ?)', 
  [title, userId]);
  const boardId = result.insertId;
  const createdBoard = await createBoardUser(userId, boardId, boardRole);
  return createdBoard;
};

export const updateBoard = async (title, id) => {
  const [result] = await db.query(
    'UPDATE kanban_db.boards SET board_title = ? WHERE board_id = ?',
  [title, id]);
  return result;
};

export const removeBoard = async (id) => {
  await db.query(
    'DELETE FROM kanban_db.tasks WHERE board_id = ?', 
  [id]);
  const [result] = await db.query(
    'DELETE FROM kanban_db.boards WHERE board_id = ?',
  [id]);
  return result;
};