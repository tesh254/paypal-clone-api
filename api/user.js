const api = require('express').Router();
const User = require('../models/user');

const userService = require('../services/user.service');

// Register a user
api.post('/signup', register);
api.post('/login', authenticate);

module.exports = api;

// Register a user method
function register(req, res, next) {
    userService.create(req.body)
        .then(
            response => response ? res.status(401).json(response) || res.status(400).json(
                {
                    message:"Invalid username or password"
                }
            ) : res.status(201).json({
                message:"User account created successfuly"
            })
        )
        .catch(err => next(err));
}

// Login a user
function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.status(200).json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}
