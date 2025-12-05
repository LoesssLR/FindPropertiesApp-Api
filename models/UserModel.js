'use strict';

const path = require('path');
const util = require('../util/util');
const http = require('../util/httpResponse');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';

const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

// safe load JSON array from file
function safeLoad(filePath) {
    const content = util.readJsonSync?.(filePath);
    return Array.isArray(content) ? content : [];
}

// in-memory users array
let users = safeLoad(USERS_FILE);

// helpers
async function persistUsers() {
    return await util.writeFile(users, USERS_FILE);
}

function ok(data, message = 'Action executed successfully.') {
    return { data, responseCode: http.STATUS?.OK ?? http.OK, message };
}

function bad(message, data = null, code = http.STATUS?.BAD_REQUEST ?? http.BAD_REQUEST) {
    return { data, responseCode: code, message };
}

function generateUserId() {
    return 'usr-' + Date.now();   // ej: usr-1733359123456
}

// full CRUD operations for users
function listUsers() {
    return ok(users);
}

function getUserById(userId) {
    const found = users.filter(u => String(u.Id) === String(userId));
    return found.length ? ok(found) : bad('The user does not exist.', []);
}

async function addUser(user) {
    if (!user || JSON.stringify(user) === '{}') {
        return bad('Body JSON is required.');
    }

    // if the id does not come from the client (mobile app / postman), we generate it
    if (!user.Id) {
        user.Id = generateUserId();
    }

    // validate duplicates by Id or email
    const dup = users.find(
        u => String(u.Id) === String(user.Id) || u.email === user.email
    );
    if (dup) return bad('Duplicate user is not allowed.');

    users.push(user);
    await persistUsers();
    return ok(user, 'User inserted successfully.');
}

async function updateUser(user) {
    if (!user || JSON.stringify(user) === '{}')
        return bad('Body JSON is required.');

    const idx = users.findIndex(u => String(u.Id) === String(user.Id));
    if (idx === -1) return bad('User not found to be updated.');

    users[idx] = { ...users[idx], ...user };
    await persistUsers();
    return ok(users[idx], 'User updated successfully.');
}

async function deleteUser(userId) {
    const before = users.length;
    users = users.filter(u => String(u.Id) !== String(userId));

    if (users.length === before)
        return bad('User not found to be removed.');

    await persistUsers();
    return ok({ Id: userId }, 'User removed properly.');
}

async function login(credentials) {
    const { email, password } = credentials || {};

    if (!email || !password) {
        return bad('Email and password are required.');
    }

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return bad('Invalid credentials.');
    }

    const token = jwt.sign(
        {
            userId: user.Id,
            email: user.email
        },
        JWT_SECRET,
        { expiresIn: '2h' }
    );

    return ok(
        {
            user,
            token
        },
        'Login successful.'
    );
}

module.exports = {
    listUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    login
};

