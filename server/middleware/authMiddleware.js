// middleware/auth.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

const auth = async (req, res, next) => {
    //console.log(req.header);
    //const token = req.header('Authorization').replace('Bearer ', '');
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    console.log(token);
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded.id)
        const user = await User.findById(decoded.id);
        //console.log(user);
        req.user=user;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

export default auth;
