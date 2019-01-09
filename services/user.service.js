const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const config = require('../config/config');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
}

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

// Get all users method
async function getAll() {
    return await User.find().select('-password');
}

// Get one user by id
async function getById(id) {
    return await User.findById(id).select('-password');
}

// Create a user account
async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        return {message:`Username ${userParam.username} is already taken`};
    }
    else if (await User.findOne({email: userParam.email})) {
        return {message:`Email ${userParam.email} is already taken`};
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

// Update  a user
async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        return {message:`Username ${userParam.username} is already taken`};
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}