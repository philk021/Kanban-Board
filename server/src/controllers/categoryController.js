import { createCategory } from '../services/categoryService.js';

export const postCategory = async (req, res) => {
  const boardId = req.body.board_id;
  const id = req.body.category_id;
  const title = req.body.category_title;
  const user = req.user;

  if (!id || !title) res.status(500).json({ message: 'Missing category fields' });
  
  try {
    await createCategory(user, title, id, boardId);
    res.status(201).json({ message: 'Category created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
};