const express = require('express');
const router = express.Router();
const {
  getBoards, 
  createBoard, 
  deleteBoard, 
  updateBoard, 
  getTasks,
  createTask, 
  updateTask, 
  deleteTask, 
  createBoardUser,
  getBoardUsers, 
  getUserId
} = require('../db/db_connection');

router.get('/', async (req, res) => {
  const user = req.user;
  try {
    const boards = await getBoards(user);
    res.status(200).json(boards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
});

router.post('/', async (req, res) => {
  const title = req.body.title;
  const user = req.user;
  
  if (!title || !user) {
    res.status(500).json({ error: "Invalid input" });
  };
  
  try {
    await createBoard(title, user, 'OWNER');
    const boards = await getBoards(user);
    res.status(201).json(boards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
});

router.get('/:boardId', async (req, res) => {
  const boardId = req.params.boardId;
  
  try {
    const tasks = await getTasks(boardId);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
});

router.post('/:boardId', async (req, res) => {
  const boardId = req.params.boardId;
  const title = req.body.task_title;
  const description = req.body.task_description;
  const category = req.body.task_category;
  const priority = req.body.task_priority;
  const date = req.body.task_date;
  
  if (!title || !description) {
    res.status(500).json({ error: "Invalid input" });
  };
  
  try {
    const result = await createTask(boardId, title, description, 
      category, priority, date
    );
    const tasks = await getTasks(boardId);
    res.status(201).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
});

router.put('/:boardId/tasks/:taskId', async (req, res) => {
  const boardId = req.params.boardId;
  const title = req.body.title;
  const description = req.body.description;
  const date = req.body.date;
  const taskId = req.params.taskId;
  
  if (!taskId || !taskTitle || !taskDescription) {
    res.status(500).json({ error: "Invalid input" });
  };

  try {
    await updateTask(taskId, title, description, date);
    const tasks = await getTasks(boardId);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
});

router.delete('/:boardId/tasks/:taskId', async (req, res) => {
  const boardId = req.params.boardId
  const taskId = req.params.taskId;

  try {
    const result = await deleteTask(taskId);
    const tasks = await getTasks(boardId);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
});

router.delete('/:boardId', async (req, res) => {
  const boardId = req.params.boardId;
  const user = req.user;

  try {
    const result = await deleteBoard(boardId);
    const boards = await getBoards(user);
    res.status(200).json(boards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
});

router.put('/:boardId', async (req, res) => {
  const boardId = req.params.boardId;
  const title = req.body.title;
  const user = req.user;
  
  if (!title) {
    res.status(500).json({ error: "Board already exists." })
  }

  try {
    const result = await updateBoard(title, boardId);
    const boards = await getBoards(user);
    res.status(200).json(boards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
});

router.post('/:boardId/users', async (req, res) => {
  const boardId = req.params.boardId;
  const email = req.body.email;
  
  if (!email) {
    res.status(500).json({ error: "Missing invite email." })
  }

  try {
    const inviteUserId = await getUserId(email);
    const result = await createBoardUser(inviteUserId, boardId, 'MEMBER');
    res.status(201).json({ message: "Invite Sent." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
});

router.get('/:boardId/users', async (req, res) => {
  const boardId = req.params.boardId;

  try {
    const result = await getBoardUsers(boardId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
});

module.exports = router;