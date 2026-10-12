import { db, getUserId } from '../config/db.js';

export const createCategory = async (user, title, categoryId, boardId) => {
  const userId = await getUserId(user);
  const [result] = await db.query(
    'INSERT INTO kanban_db.categories(board_id, category_id, category_title) \
     SELECT bu.board_id, UUID_TO_BIN(?), ? \
     FROM kanban_db.board_users bu \
     WHERE bu.board_id = UUID_TO_BIN(?) \
       AND bu.user_id = ?',
  [categoryId, title, boardId, userId]);
  return result;
};