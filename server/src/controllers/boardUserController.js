import { createBoardUser } from '../services/boardUserService.js';
import { BOARD_ROLES } from '../constants.js';
import { getUserId } from '../config/db.js';

export const postBoardUser = async (req, res) => {
  const boardId = req.params.boardId;
  const email = req.body.email;
  
  if (!email) res.status(500).json({ message: 'Missing invite email' });
  
  try {
    const inviteUserId = await getUserId(email);
    await createBoardUser(inviteUserId, boardId, BOARD_ROLES.MEMBER);
    res.status(201).json({ message: 'Invite Sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  };
}