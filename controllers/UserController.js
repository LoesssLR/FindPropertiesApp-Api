'use strict';

const userModel = require('../models/UserModel');

// GET /users
exports.listAllUsers = async function (req, res) {
    const result = await userModel.listUsers();
    res.json(result);
};

// GET /users/:userId
exports.getUserById = async function (req, res) {
    const userId = req.params.userId;
    const result = await userModel.getUserById(userId);
    res.json(result);
};

// POST /users
exports.createUser = async function (req, res) {
    const body = req.body;
    const result = await userModel.addUser(body);
    res.json(result);
};

// PUT /users/:userId
exports.updateUserById = async function (req, res) {
    const userId = req.params.userId;
    const payload = { ...req.body, Id: userId };
    const result = await userModel.updateUser(payload);
    res.json(result);
};

// DELETE /users/:userId
exports.deleteUserById = async function (req, res) {
    const userId = req.params.userId;
    const result = await userModel.deleteUser(userId);
    res.json(result);
};

// POST /auth/signup
exports.signup = async function (req, res) {
    const body = req.body;
    const result = await userModel.addUser(body);
    res.json(result);
};

// POST /auth/login
exports.login = async function (req, res) {
    const result = await userModel.login(req.body);
    res.json(result);
};
