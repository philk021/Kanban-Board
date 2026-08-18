const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');
const {getProjects, createProject, deleteProject, getTasks, 
  createTask, updateTask, deleteTask} = require('../db/db_connection');

router.get('/', async (req, res) => {
    const user = req.user;

    if (!user) {
      res.status(500).json({error: "Not logged in"});
    };

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
    
    if (!user) {
      res.status(500).json({error: "Not logged in"});
    };
    
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

router.get('/:boardId', async (req, res) => {
    const boardId = req.params.boardId;
    const user = req.user;
    
    if (!user) {
      res.status(500).json({error: "Not logged in"});
    };

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
    const taskTitle = req.body.title;
    const taskDescription = req.body.description;
    const taskCategory = req.body.category;
    const taskPriority = req.body.priority;
    const taskDate = req.body.date;
    const user = req.user;
    
    if (!user) {
      res.status(500).json({error: "Not logged in"});
    };
    
    if (!taskTitle || !taskDescription) {
      res.status(500).json({error: "Invalid input"});
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
    const taskTitle = req.body.title;
    const taskDescription = req.body.description;
    const taskDate = req.body.date;
    const taskId = req.params.taskId;
    const user = req.user;
    
    if (!user) {
      res.status(500).json({error: "Not logged in"});
    };

    if (!taskId || !taskTitle || !taskDescription) {
      res.status(500).json({error: "Invalid input"});
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
    const user = req.user;
    
    if (!user) {
      res.status(500).json({error: "Not logged in"});
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

router.delete('/:boardId', async (req, res) => {
    const boardId = req.params.boardId;
    const user = req.user;
    
    if (!user) {
      res.status(500).json({error: "Not logged in"});
    };

    try {
      const result = await deleteProject(boardId);
      const projects = await getProjects(user);
      res.status(200).json(projects);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
    };
});

module.exports = router;