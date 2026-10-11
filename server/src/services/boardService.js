import { db, getUserId } from '../config/db.js';
import { createBoardUser } from './boardUserService.js';

export const fetchBoards = async (user) => {
  const user_id = await getUserId(user);
  const [result] = await db.query(
    'SELECT b.board_id, b.board_title, bu.board_role \
     FROM project_management_db.boards b \
     JOIN project_management_db.board_users bu ON bu.board_id = b.board_id \
     WHERE bu.user_id = ?', 
  [user_id]);
  return result;
};

export const createBoard = async (title, user, board_role) => {
  const user_id = await getUserId(user);
  const [create_board_result] = await db.query(
    'INSERT INTO project_management_db.boards(board_title, user_id) VALUES(?, ?)', 
  [title, user_id]);
  const board_id = create_board_result.insertId;
  const create_board_user_result = await createBoardUser(user_id, board_id, board_role);
  return create_board_user_result;
};

export const updateBoard = async (title, id) => {
  const [result] = await db.query(
    'UPDATE project_management_db.boards SET board_title = ? WHERE board_id = ?',
  [title, id]);
  return result;
};

export const removeBoard = async (id) => {
  await db.query(
    'DELETE FROM project_management_db.tasks WHERE board_id = ?', 
  [id]);
  const [result] = await db.query(
    'DELETE FROM project_management_db.boards WHERE board_id = ?',
  [id]);
  return result;
};