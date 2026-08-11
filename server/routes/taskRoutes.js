const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');
const {getTasks, createTask, updateTask, deleteTask} = require('../db/db_connection');

router.get('/:id', async (req, res) => {
    const boardId = req.params.id;
    try {
      const tasks = await getTasks(boardId);
      res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
    };
});

router.post('/new', async (req, res) => {
    const boardId = req.body.boardId;
    const taskTitle = req.body.taskTitle;
    const taskDescription = req.body.taskDescription;
    const taskCategory = req.body.taskCategory;
    const taskPriority = req.body.taskPriority;
    const taskDate = req.body.taskDate;
    
    if (!boardId || !taskTitle || !taskDescription) {
      res.status(500).json({error: "Invalid input"})
    };
    
    try {
      const result = await createTask(boardId, taskTitle, taskDescription, 
        taskCategory, taskPriority, taskDate
      );
      const tasks = await getTasks(boardId);
      res.status(201).json(tasks);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
    };
});

router.put('/edit/:id', async (req, res) => {
    const boardId = req.body.boardId;
    const taskTitle = req.body.taskTitle;
    const taskDescription = req.body.taskDescription;
    const taskDate = req.body.taskDate;
    const taskId = req.params.taskId;

    if (!boardId || !taskId || !taskTitle || !taskDescription) {
      res.status(500).json({error: "Invalid input"})
    };

    try {
      await updateTask(taskId, taskTitle, taskDescription, taskDate);
      const tasks = await getTasks(boardId);
      res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
    };
});

router.delete('/remove/:id', async (req, res) => {
    const boardId = req.body.boardId;
    const taskId = req.params.taskId;

    if (!boardId || !taskId) {
      res.status(500).json({error: "Invalid input"})
    };

    try {
      const result = await deleteTask(taskId);
      const tasks = await getTasks(boardId);
      res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
    };
});

module.exports = router;