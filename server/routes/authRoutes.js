const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {createUser, loginUser, storeRefreshToken} = require('../db/db_connection');

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

router.post('/create', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let user = [];
    
    if (!email || !password) {
        res.status(500).json({message: "Invalid email or password."})
    };
    if (!emailRegex.test(email)) {
        res.status(500).json({message: "Invalid email."})
    }

    try {
        user = await loginUser(email);
        if (user[0]) {
            return res.status(400).json({message: "Email already in use."})
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(email, hashedPassword);
        const accessToken = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign({email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'}); 
        await storeRefreshToken(refreshToken);
        res.cookie('refresh-token', refreshToken, {httpOnly: true}, {maxAge: 24 * 60 * 60 * 1000});
        res.status(201).json({message: accessToken});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let user = [];
    
    if (!email || !password) {
        res.status(500).json({message: "Invalid email or password."})
    };

    try {
        user = await loginUser(email);
        if (user[0] == null) {
            return res.status(400).json({message: "Email or password is incorrect."})
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }

    try {
        if (await bcrypt.compare(password, user[0].user_password)) {
            const accessToken = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});
            const refreshToken = jwt.sign({email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});
            await storeRefreshToken(refreshToken);      
            res.cookie('refresh-token', refreshToken, {httpOnly: true}, {maxAge: 24 * 60 * 60 * 1000});
            res.status(200).json({message: accessToken});
        } else {
            res.status(400).json({message: "Email or password is incorrect."});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
});

module.exports = router;