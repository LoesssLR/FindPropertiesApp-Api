'use strict';

const propertyModel = require('../models/PropertyModel');

// GET /properties
exports.listAllProperties = async function (req, res) {
    const result = await propertyModel.listProperties(req.query || {});
    res.json(result);
};

// GET /properties/:propertyId
exports.getPropertyById = async function (req, res) {
    const propertyId = req.params.propertyId;
    const result = await propertyModel.getPropertyById(propertyId);
    res.json(result);
};

// POST /properties
exports.createProperty = async function (req, res) {
    // OwnerId comes from the authenticated user (token)
    const body = {
        ...req.body,
        OwnerId: req.userId
    };
    const result = await propertyModel.addProperty(body);
    res.json(result);
};

// PUT /properties/:propertyId
exports.updatePropertyById = async function (req, res) {
    const propertyId = req.params.propertyId;
    const payload = {
        ...req.body,
        Id: propertyId,
        OwnerId: req.userId
    };
    const result = await propertyModel.updateProperty(payload);
    res.json(result);
};

// DELETE /properties/:propertyId
exports.deletePropertyById = async function (req, res) {
    const propertyId = req.params.propertyId;
    const requesterId = req.userId; // from authenticated user (token)
    const result = await propertyModel.deletePropertyIfOwner(propertyId, requesterId);
    res.json(result);
};
