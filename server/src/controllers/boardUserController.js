import { createBoardUser } from '../services/boardUserService.js';
import { BOARD_ROLES } from '../constants.js';

export const postBoardUser = async (req, res) => {
  const boardId = req.params.boardId;
  const email = req.body.email;
  const user = req.user;
  
  if (!email) res.status(500).json({ message: 'Missing invite email' });
  
  try {
    await createBoardUser(user, email, boardId, BOARD_ROLES.MEMBER);
    res.status(201).json({ message: 'Invite Sent' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
}