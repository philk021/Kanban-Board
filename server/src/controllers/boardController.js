import { fetchBoards, createBoard, updateBoard, removeBoard } from '../services/boardService.js';
import { BOARD_ROLES } from '../constants.js';

export const getBoards = async (req, res) => {
  const user = req.user; 
  try {
    const boards = await fetchBoards(user);
    res.status(200).json(boards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
};

export const postBoard = async (req, res) => {
  const id = req.body.board_id;
  const title = req.body.board_title;
  const user = req.user;

  if (!id || !title) res.status(500).json({ message: 'Missing board fields' });
  
  try {
    await createBoard(id, user, title, BOARD_ROLES.OWNER);
    const boards = await fetchBoards(user);
    res.status(201).json(boards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
};

export const putBoard = async (req, res) => {
  const boardId = req.params.boardId;
  const title = req.body.title;
  const user = req.user;
  
  if (!title) res.status(500).json({ message: 'Missing board title' });
  
  try {
    await updateBoard(boardId, user, title);
    const boards = await fetchBoards(user);
    res.status(200).json(boards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
};

export const deleteBoard = async (req, res) => {
  const boardId = req.params.boardId;
  const user = req.user;
  try {
    await removeBoard(boardId, user);
    const boards = await fetchBoards(user);
    res.status(200).json(boards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
};