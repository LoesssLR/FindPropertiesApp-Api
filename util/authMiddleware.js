'use strict';

const jwt = require('jsonwebtoken');
const http = require('../util/httpResponse');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';

// Middleware to protect routes that require authentication
// and validate the user only can add a property for himself when its logged in

module.exports = function authRequired(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({
            data: null,
            responseCode: http.STATUS?.UNAUTHORIZED ?? 401,
            message: 'Authorization token is required.'
        });
    }

    // example: Bearer + token

    const token = authHeader.slice(7);

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch (err) {
        return res.json({
            data: null,
            responseCode: http.STATUS?.UNAUTHORIZED ?? 401,
            message: 'Invalid or expired token.'
        });
    }
};
