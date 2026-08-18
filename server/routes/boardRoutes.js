const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');
const {getProjects, createProject, getTasks, createTask, updateTask, deleteTask} = require('../db/db_connection');

router.get('/:boardId', async (req, res) => {
    const boardId = req.params.boardId;
    try {
      const tasks = await getTasks(boardId);
      res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
    };
});

router.post('/:boardId', async (req, res) => {
    const boardId = req.params.boardId;
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

router.put('/:boardId/tasks/:taskId', async (req, res) => {
    const boardId = req.params.boardId;
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

router.delete('/:boardId/tasks/:taskId', async (req, res) => {
    const boardId = req.params.boardId
    const taskId = req.params.taskId;

    if (!taskId) {
      res.status(500).json({error: "Invalid input"});
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

router.get('/', async (req, res) => {
    const user = req.user;
    
    if (!user) {
      res.status(500).json({error: "Not logged in"});
    }

    try {
      const projects = await getProjects(user);
      res.status(200).json(projects);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
    };
});

router.post('/', async (req, res) => {
    const boardTitle = req.body.boardTitle;
    const user = req.user;
    
    if (!boardTitle || !user) {
      res.status(500).json({error: "Invalid input"});
    };
    
    try {
      await createProject(boardTitle, user);
      const projects = await getProjects(user);
      res.status(201).json(projects);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
    };
});

module.exports = router;