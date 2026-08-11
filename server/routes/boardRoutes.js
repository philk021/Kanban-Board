const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');
const {getProjects, createProject} = require('../db/db_connection');

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

router.post('/new', async (req, res) => {
    const boardTitle = req.body.boardTitle;
    const user = req.user;
    
    if (!boardTitle || !user) {
      res.status(500).json({error: "Invalid input"});
    };
    
    try {
      const result = await createProject(boardTitle, user);
      const projects = await getProjects(user);
      res.status(201).json(projects);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
    };
});

module.exports = router;