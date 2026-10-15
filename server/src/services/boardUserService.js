import { db, getUserId} from '../config/db.js';

export const createBoardUser = async (user, email, boardId, boardRole) => {
  const userId = await getUserId(user);
  const inviteId = await getUserId(email);
  const [result] = await db.query(
    'INSERT INTO kanban_db.board_users(board_id, user_id, board_role) \
     VALUES (UUID_TO_BIN(?), ?, ?)',
  [boardId, inviteId, boardRole]);
  return result;
};